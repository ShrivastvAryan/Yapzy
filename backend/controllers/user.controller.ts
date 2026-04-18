import type { Request, Response } from 'express';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import type { AuthRequest } from '../middleware/auth.middleware';


export const updateAvatar = async (req: AuthRequest, res: Response) => {
  try {
    // If multer-storage-cloudinary works, req.file.path is the URL
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const imageUrl = req.file.path; // The Cloudinary URL

    await db.update(users)
      .set({ avatarUrl: imageUrl })
      .where(eq(users.id, req.userId!));

    res.json({ 
      message: "Avatar uploaded to Cloudinary successfully", 
      url: imageUrl 
    });
  } catch (error) {
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
};