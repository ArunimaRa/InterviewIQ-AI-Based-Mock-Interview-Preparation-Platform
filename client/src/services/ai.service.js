import api from './api';

export const analyzeAnswer = async (question, answer) => {
  const response = await api.post('/ai/analyze', { question, answer });
  return response.data;
};
