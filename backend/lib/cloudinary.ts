import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import 'dotenv/config';

// 1. Setup Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 2. Setup Storage Engine
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'chat_app_uploads', // The name of the folder in Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      public_id: `file-${Date.now()}`, // Unique name
    };
  },
});

// 3. Create the Multer Upload Middleware
export const upload = multer({ storage: storage });