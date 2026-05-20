import express from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js';
import fs from 'fs';

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// @desc    Upload resume
// @route   POST /api/resume/upload
// @access  Private
router.post('/upload', protect, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Update user's resumeUrl
    const user = await User.findById(req.user._id);
    if (user) {
      user.resumeUrl = `/${req.file.path.replace(/\\/g, '/')}`; // Ensure correct path format
      await user.save();
      
      res.status(200).json({
        message: 'Resume uploaded successfully',
        resumeUrl: user.resumeUrl,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
