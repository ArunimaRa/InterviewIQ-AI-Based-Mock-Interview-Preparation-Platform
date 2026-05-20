export const generateFeedback = async (question, answer) => {
  // Simulate API delay (representing call to Gemini/OpenAI)
  await new Promise(resolve => setTimeout(resolve, 1500));

  const wordCount = answer.split(' ').length;
  
  // Simulate AI grading metrics
  let technicalAccuracy = 0;
  let communicationScore = 0;
  let confidenceLevel = '';
  let improvementSuggestions = [];
  let overallScore = 0;

  if (wordCount < 15) {
    technicalAccuracy = 45;
    communicationScore = 50;
    confidenceLevel = 'Low';
    overallScore = 48;
    improvementSuggestions = [
      "Your answer was too brief. Try elaborating on the core concepts.",
      "Include technical examples to demonstrate your knowledge.",
      "Structure your answer using the STAR method when applicable."
    ];
  } else if (wordCount < 40) {
    technicalAccuracy = 75;
    communicationScore = 80;
    confidenceLevel = 'Moderate';
    overallScore = 77;
    improvementSuggestions = [
      "Good foundational understanding, but lacks advanced details.",
      "Try to explicitly mention trade-offs or edge cases.",
      "Your communication is clear, but could use more professional terminology."
    ];
  } else {
    technicalAccuracy = 92;
    communicationScore = 95;
    confidenceLevel = 'High';
    overallScore = 93;
    improvementSuggestions = [
      "Excellent response! Very little room for improvement here.",
      "For perfection, you could relate this to a real-world project you've worked on."
    ];
  }

  return {
    score: overallScore,
    metrics: {
      technicalAccuracy,
      communicationScore,
      confidenceLevel
    },
    feedback: overallScore > 80 
      ? "Excellent explanation! You clearly articulated the concept and its nuances." 
      : "Your answer provided some good points, but needs more depth to fully satisfy technical expectations.",
    improvementSuggestions
  };
};
