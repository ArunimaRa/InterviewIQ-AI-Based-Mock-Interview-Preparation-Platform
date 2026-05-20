import api from './api';

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);
  
  const response = await api.post('/resume/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const analyzeResume = async (resumeText) => {
  const response = await api.post('/ai/resume-analyze', { resumeText });
  return response.data;
};
