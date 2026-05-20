import { useState } from 'react';
import { Play, CheckCircle2, Clock, Award, FileText } from 'lucide-react';

const mockQuestions = [
  { q: "Which of the following is not a Java feature?", options: ["Dynamic", "Architecture Neutral", "Use of pointers", "Object-oriented"], ans: 2 },
  { q: "What is a React Hook?", options: ["A physical hook", "A function that lets you hook into React state", "A CSS class", "A database query"], ans: 1 },
  { q: "What does DBMS stand for?", options: ["Data Binding Management System", "Database Management System", "Data Base Memory System", "None"], ans: 1 }
];

const McqTestTab = () => {
  const [activeTest, setActiveTest] = useState(null);
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [mcqScore, setMcqScore] = useState(0);
  const [mcqTime, setMcqTime] = useState(60); // 1 min for demo
  const [showResult, setShowResult] = useState(false);

  const handleMcqAnswer = (selectedIndex) => {
    if (selectedIndex === mockQuestions[currentMcqIndex].ans) {
      setMcqScore(prev => prev + 1);
    }
    if (currentMcqIndex + 1 < mockQuestions.length) {
      setCurrentMcqIndex(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 relative z-10 animate-fade-in">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Technical MCQ Tests</h1>
          <p className="text-gray-400">Test your knowledge across various technical domains.</p>
        </div>
        {activeTest && !showResult && (
          <div className="flex items-center gap-2 bg-dark/50 px-4 py-2 rounded-lg border border-white/10 font-mono text-xl text-secondary">
            <Clock className="w-5 h-5" />
            {Math.floor(mcqTime / 60)}:{(mcqTime % 60).toString().padStart(2, '0')}
          </div>
        )}
      </header>

      {!activeTest ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Java Core Concepts', category: 'Backend', questions: 20, time: '30 mins', color: 'from-orange-500 to-red-500' },
            { title: 'DBMS Architecture', category: 'Database', questions: 15, time: '25 mins', color: 'from-blue-500 to-cyan-500' },
            { title: 'Operating Systems', category: 'Core CS', questions: 25, time: '40 mins', color: 'from-purple-500 to-indigo-500' },
            { title: 'Computer Networks', category: 'Core CS', questions: 30, time: '45 mins', color: 'from-green-500 to-emerald-500' },
            { title: 'React Fundamentals', category: 'Frontend', questions: 20, time: '30 mins', color: 'from-cyan-400 to-blue-600' }
          ].map((test, i) => (
            <div key={i} className="glass-panel overflow-hidden group hover:-translate-y-2 transition-all duration-300">
              <div className={`h-2 w-full bg-gradient-to-r ${test.color}`}></div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300 font-medium">
                    {test.category}
                  </span>
                  <CheckCircle2 className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{test.title}</h3>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <span className="flex items-center gap-1"><FileText className="w-4 h-4" /> {test.questions} Qs</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {test.time}</span>
                </div>
                <button 
                  onClick={() => { setActiveTest(test.title); setCurrentMcqIndex(0); setMcqScore(0); setShowResult(false); }}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors font-medium text-white flex justify-center items-center gap-2"
                >
                  <Play className="w-4 h-4" /> Start Test
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : showResult ? (
        <div className="glass-panel p-10 max-w-2xl mx-auto text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Test Completed!</h2>
          <p className="text-gray-400 mb-8">You have finished the {activeTest} assessment.</p>
          
          <div className="bg-dark/50 p-6 rounded-xl border border-white/5 mb-8">
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">Your Final Score</p>
            <p className="text-5xl font-bold text-white mb-2">{mcqScore} <span className="text-2xl text-gray-500">/ {mockQuestions.length}</span></p>
            <p className="text-secondary font-medium">{Math.round((mcqScore / mockQuestions.length) * 100)}% Accuracy</p>
          </div>

          <button 
            onClick={() => setActiveTest(null)}
            className="btn-primary px-8"
          >
            Return to Tests
          </button>
        </div>
      ) : (
        <div className="glass-panel p-8 max-w-3xl mx-auto animate-fade-in">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <h2 className="text-xl font-bold text-white">{activeTest}</h2>
            <span className="bg-white/10 px-3 py-1 rounded text-sm text-gray-300">
              Question {currentMcqIndex + 1} of {mockQuestions.length}
            </span>
          </div>

          <h3 className="text-2xl font-medium text-white mb-8">
            {mockQuestions[currentMcqIndex].q}
          </h3>

          <div className="space-y-4">
            {mockQuestions[currentMcqIndex].options.map((opt, i) => (
              <button 
                key={i}
                onClick={() => handleMcqAnswer(i)}
                className="w-full text-left p-4 rounded-lg bg-dark/40 border border-white/10 hover:border-secondary/50 hover:bg-secondary/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-sm group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-lg text-gray-300 group-hover:text-white">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default McqTestTab;
