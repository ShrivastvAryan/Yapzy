import type { Request, Response } from "express";
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

//Helper to generate both tokens
const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body as RegisterRequest;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db.insert(users).values({
      email,
      username,
      password: hashedPassword,
    }).returning();

    if (!newUser) {
  return res.status(500).json({ error: "User creation failed" });
}

    res.status(201).json({ message: "User created", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: "Registration failed." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // 2. Generate both tokens
    const { accessToken, refreshToken } = generateTokens(user.id);

    // 3. Optional: Store refresh token in DB to allow for revoking access
    await db.update(users).set({ refreshToken }).where(eq(users.id, user.id));

    // 4. Set Refresh Token as a secure HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // 5. Send Access Token in JSON
    res.json({ 
      accessToken, 
      user: { id: user.id, username: user.username } 
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

// 6. NEW: Refresh logic to get a new Access Token
export const refresh = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) return res.status(401).json({ error: "No refresh token" });

    // Verify token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as { id: string };
    
    // Check if user exists and token matches what's in DB
    const [user] = await db.select().from(users).where(eq(users.id, decoded.id));
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    // Generate NEW tokens
    const tokens = generateTokens(user.id);

    // Update DB with the NEW refresh token (Rotate it for safety)
    await db.update(users).set({ refreshToken: tokens.refreshToken }).where(eq(users.id, user.id));

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ accessToken: tokens.accessToken });
  } catch (error) {
    res.status(403).json({ error: "Token expired or invalid" });
  }
};

//Logout logic to clear tokens
export const logout = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;
  if (refreshToken) {
    // Remove from DB so it can't be used again
    await db.update(users).set({ refreshToken: null }).where(eq(users.refreshToken, refreshToken));
  }
  res.clearCookie('refreshToken');
  res.status(200).json({ message: "Logged out" });
};