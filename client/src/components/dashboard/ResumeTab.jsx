import { useState } from 'react';
import { Upload, FileText, BrainCircuit, Settings, CheckCircle2 } from 'lucide-react';
import { uploadResume } from '../../services/resume.service';

const ResumeTab = ({ resumeFile, setResumeFile }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setIsUploading(true);
      setUploadError('');
      
      try {
        await uploadResume(file);
        console.log('Resume uploaded successfully');
      } catch (error) {
        console.error("Upload failed:", error);
        setUploadError(error.response?.data?.message || 'Failed to upload resume');
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative z-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Resume Analysis</h1>
      <p className="text-gray-400 mb-8">Upload your latest resume to tailor your mock interviews and MCQ tests.</p>

      <div className="glass-panel p-10 flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10 hover:border-primary/50 transition-colors group">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <Upload className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Drag & Drop your resume here</h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Supported formats: PDF, DOCX. Maximum file size: 5MB. Our AI will automatically parse your experience and skills.
        </p>
        <label className="btn-primary cursor-pointer px-8 py-3 text-lg">
          Select File
          <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} />
        </label>

        {uploadError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm w-full max-w-md">
            {uploadError}
          </div>
        )}

        {resumeFile && (
          <div className="mt-8 p-4 bg-dark/50 rounded-xl border border-white/10 flex items-center gap-4 animate-fade-in w-full max-w-md">
            <FileText className="w-8 h-8 text-secondary" />
            <div className="text-left flex-1">
              <p className="font-semibold text-white truncate">{resumeFile.name}</p>
              <p className="text-xs text-gray-400">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
            {isUploading ? (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                Uploading...
              </div>
            ) : (
              <button className="text-primary hover:text-white transition-colors text-sm font-medium">
                Analyzed
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-primary" />
            Extracted Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {['React', 'Node.js', 'MongoDB', 'JavaScript', 'TypeScript', 'System Design'].map((skill, i) => (
              <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-secondary" />
            Target Roles
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg text-secondary font-medium">
              Frontend Engineer
            </div>
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-primary font-medium">
              Full Stack Developer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTab;
