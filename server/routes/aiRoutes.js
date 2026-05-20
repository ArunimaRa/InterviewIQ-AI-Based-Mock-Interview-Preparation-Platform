import express from 'express';
import { analyzeAnswer } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Analyze interview answer
// @route   POST /api/ai/analyze
// @access  Private
router.post('/analyze', protect, analyzeAnswer);

export default router;
