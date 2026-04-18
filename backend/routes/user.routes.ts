import { Router } from 'express';
import { updateAvatar } from '../controllers/user.controller';
import { upload } from '../lib/cloudinary';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// 'avatar' must match the key used in the Frontend FormData
router.post('/avatar', verifyToken, upload.single('avatar'), updateAvatar);

export default router;