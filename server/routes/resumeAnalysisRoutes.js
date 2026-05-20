import express from 'express';
import { generateResumeAnalysis } from '../services/resumeService.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Analyze resume text (ATS scoring)
// @route   POST /api/ai/resume-analyze
// @access  Private
router.post('/resume-analyze', protect, async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ message: 'Resume text is required' });
    }

    const analysis = await generateResumeAnalysis(resumeText);
    res.status(200).json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
