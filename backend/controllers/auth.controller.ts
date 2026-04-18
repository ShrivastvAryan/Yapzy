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

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body as RegisterRequest;

    // 1. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Insert into Supabase via Drizzle
    const [newUser] = await db.insert(users).values({
      email,
      username,
      password: hashedPassword,
    }).returning();

    if (!newUser) {
      throw new Error("Failed to create user");
    }

    res.status(201).json({ message: "User created", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: "Registration failed. Email might be taken." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Find user
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user) return res.status(404).json({ error: "User not found" });

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    // 3. Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};