import { useState, useEffect } from 'react';
import Sidebar from './dashboard/Sidebar';
import OverviewTab from './dashboard/OverviewTab';
import InterviewTab from './dashboard/InterviewTab';
import ResumeTab from './dashboard/ResumeTab';
import McqTestTab from './dashboard/McqTestTab';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [resumeFile, setResumeFile] = useState(null);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  return (
    <div className="min-h-screen pt-20 bg-darker flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 relative overflow-y-auto overflow-x-hidden">
        <div className="p-4 md:p-8 relative min-h-[calc(100vh-80px)]">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          {activeTab === 'overview' && <OverviewTab setActiveTab={setActiveTab} resumeFile={resumeFile} />}
          {activeTab === 'interviews' && <InterviewTab />}
          {activeTab === 'resume' && <ResumeTab resumeFile={resumeFile} setResumeFile={setResumeFile} />}
          {activeTab === 'tests' && <McqTestTab />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
