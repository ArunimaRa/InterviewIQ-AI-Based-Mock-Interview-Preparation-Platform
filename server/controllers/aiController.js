import { generateFeedback } from '../services/aiService.js';

export const analyzeAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ message: 'Question and answer are required' });
    }

    const aiResponse = await generateFeedback(question, answer);
    res.status(200).json(aiResponse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
