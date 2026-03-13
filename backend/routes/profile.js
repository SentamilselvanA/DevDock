import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  updateAvatar,
} from '../controllers/profileController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get user profile
router.get('/', getUserProfile);

// Update user profile
router.patch('/', updateUserProfile);

// Update avatar/image
router.patch('/avatar', updateAvatar);

export default router;
