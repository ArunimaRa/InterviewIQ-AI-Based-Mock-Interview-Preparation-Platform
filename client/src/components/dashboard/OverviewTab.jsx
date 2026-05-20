import { useState, useEffect } from 'react';
import { Play, Award, BrainCircuit, CheckCircle2, Clock, BarChart3, FileText, Upload } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const mockPerformanceData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 70 },
  { name: 'Week 3', score: 75 },
  { name: 'Week 4', score: 82 },
  { name: 'Week 5', score: 85 },
  { name: 'Week 6', score: 92 },
];

const OverviewTab = ({ setActiveTab, resumeFile }) => {
  // Simple animation hook for number counters
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += 5;
      if (current >= 85) {
        setAnimatedScore(85);
        clearInterval(interval);
      } else {
        setAnimatedScore(current);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8 relative z-10 animate-fade-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
          <p className="text-gray-400">Track your interview preparation progress and performance.</p>
        </div>
        <button onClick={() => setActiveTab('interviews')} className="btn-primary flex items-center gap-2">
          <Play className="w-4 h-4 fill-current" />
          Start AI Mock
        </button>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg. Score', value: `${animatedScore}%`, icon: Award, color: 'text-yellow-400', bg: 'bg-yellow-400/20' },
          { label: 'Interviews', value: '12', icon: BrainCircuit, color: 'text-primary', bg: 'bg-primary/20' },
          { label: 'MCQs Taken', value: '45', icon: CheckCircle2, color: 'text-secondary', bg: 'bg-secondary/20' },
          { label: 'Practice Time', value: '14h', icon: Clock, color: 'text-purple-500', bg: 'bg-purple-500/20' }
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-4 md:p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
            <div className={`p-2 md:p-3 rounded-lg ${stat.bg} shrink-0`}>
              <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-xs md:text-sm text-gray-400">{stat.label}</p>
              <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="glass-panel p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Performance Trajectory
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockPerformanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                <XAxis dataKey="name" stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} />
                <YAxis stroke="#9CA3AF" tick={{fill: '#9CA3AF'}} domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#4F46E5' }}
                />
                <Area type="monotone" dataKey="score" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Topics & Resume Status */}
        <div className="space-y-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Knowledge Analysis</h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-green-400 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div> Strong Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">React Hooks</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">REST APIs</span>
                <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs rounded border border-green-500/20">Node.js Basics</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-red-400 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-400"></div> Weak Topics
              </h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20">System Design</span>
                <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20">Dynamic Programming</span>
              </div>
            </div>
          </div>

          {/* Resume Status */}
          <div className="glass-panel p-6 flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              <FileText className="w-20 h-20 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2 relative z-10">Resume Status</h3>
            
            {resumeFile ? (
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Uploaded & Analyzed</span>
                </div>
                <p className="text-xs text-gray-400 mb-4 truncate">{resumeFile.name}</p>
                <button className="text-xs text-primary hover:text-white transition-colors" onClick={() => setActiveTab('resume')}>View Details &rarr;</button>
              </div>
            ) : (
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-yellow-400 mb-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                  <span className="text-sm font-medium">Action Required</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">No resume found. Upload it to unlock tailored AI questions.</p>
                <button className="btn-secondary text-xs py-1.5 px-4" onClick={() => setActiveTab('resume')}>
                  Upload Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="glass-panel p-6">
        <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { title: 'Completed Backend MCQ Test', score: '88%', time: '2 hours ago', icon: CheckCircle2, color: 'text-secondary' },
            { title: 'Mock AI Interview: System Design', score: '72%', time: 'Yesterday', icon: BrainCircuit, color: 'text-primary' },
            { title: 'Updated Profile Resume', score: null, time: '3 days ago', icon: Upload, color: 'text-purple-500' }
          ].map((activity, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-dark/50 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`p-2 bg-dark rounded-md ${activity.color}`}>
                  <activity.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm md:text-base">{activity.title}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
              {activity.score && (
                <div className="text-right">
                  <span className="text-xs text-gray-400">Score</span>
                  <p className={`font-bold ${parseInt(activity.score) >= 80 ? 'text-green-400' : 'text-yellow-400'}`}>
                    {activity.score}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
