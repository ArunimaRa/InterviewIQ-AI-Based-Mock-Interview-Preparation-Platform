import { useState } from 'react';
import { Clock, Send, Award } from 'lucide-react';
import { analyzeAnswer } from '../../services/ai.service';

const technicalQuestions = [
  "Can you explain how a load balancer works in a system architecture?",
  "What are the differences between SQL and NoSQL databases?",
  "Explain the concept of closures in JavaScript.",
  "How does Docker differ from traditional virtual machines?",
  "What is the time complexity of QuickSort and why?"
];

const InterviewTab = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [interviewTime, setInterviewTime] = useState(600); // 10 mins

  const handleAiAnalysis = async () => {
    if (!answer) return;
    setIsAnalyzing(true);
    
    try {
      const data = await analyzeAnswer(technicalQuestions[currentQIndex], answer);
      setAiFeedback(data);
    } catch (error) {
      console.error("Analysis failed:", error);
      setAiFeedback({
        score: 50,
        metrics: { technicalAccuracy: 50, communicationScore: 50, confidenceLevel: 'Low' },
        feedback: "We encountered an error analyzing your answer. Please try again.",
        improvementSuggestions: ["Try checking your server connection."]
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQIndex((prev) => (prev + 1) % technicalQuestions.length);
    setAnswer("");
    setAiFeedback(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative z-10 animate-fade-in">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Mock Interview</h1>
          <p className="text-gray-400">Practice your answers and get real-time AI feedback.</p>
        </div>
        <div className="flex items-center gap-2 bg-dark/50 px-4 py-2 rounded-lg border border-white/10 font-mono text-xl text-primary">
          <Clock className="w-5 h-5" />
          {Math.floor(interviewTime / 60)}:{(interviewTime % 60).toString().padStart(2, '0')}
        </div>
      </header>

      <div className="glass-panel p-6 border-l-4 border-l-primary relative">
        <div className="absolute top-4 right-4 text-sm text-gray-500">Question {currentQIndex + 1}/{technicalQuestions.length}</div>
        <h3 className="text-lg text-primary mb-2 font-medium">Technical Question:</h3>
        <p className="text-xl pr-16">{technicalQuestions[currentQIndex]}</p>
      </div>

      <div className="glass-panel p-6">
        <h3 className="text-lg mb-4 font-medium">Your Answer:</h3>
        <textarea
          className="input-field min-h-[150px] resize-none"
          placeholder="Type your response here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={handleNextQuestion}
            className="btn-secondary flex items-center gap-2"
          >
            Skip Question
          </button>
          <button 
            onClick={handleAiAnalysis}
            disabled={isAnalyzing || !answer}
            className="btn-primary flex items-center gap-2 disabled:opacity-50"
          >
            {isAnalyzing ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Analyzing...
              </span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit for Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {aiFeedback && (
        <div className="glass-panel p-6 bg-primary/5 border-primary/20 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-400" />
              AI Analysis Report
            </h3>
            <div className="px-4 py-1 rounded-full bg-dark font-bold text-lg border border-white/10 flex items-center gap-2">
              Overall Score: 
              <span className={aiFeedback.score > 80 ? "text-green-400" : "text-yellow-400"}>
                {aiFeedback.score}/100
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-dark/50 p-4 rounded-lg border border-white/5 text-center">
              <p className="text-xs text-gray-400 mb-1">Technical Accuracy</p>
              <p className="text-2xl font-bold text-blue-400">{aiFeedback.metrics.technicalAccuracy}%</p>
            </div>
            <div className="bg-dark/50 p-4 rounded-lg border border-white/5 text-center">
              <p className="text-xs text-gray-400 mb-1">Communication</p>
              <p className="text-2xl font-bold text-green-400">{aiFeedback.metrics.communicationScore}%</p>
            </div>
            <div className="bg-dark/50 p-4 rounded-lg border border-white/5 text-center">
              <p className="text-xs text-gray-400 mb-1">Confidence Level</p>
              <p className={`text-xl font-bold mt-1 ${aiFeedback.metrics.confidenceLevel === 'High' ? 'text-green-400' : 'text-yellow-400'}`}>
                {aiFeedback.metrics.confidenceLevel}
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-base mb-6 leading-relaxed p-4 bg-dark/30 rounded-lg italic">
            "{aiFeedback.feedback}"
          </p>

          <div className="bg-dark/50 p-4 rounded-lg border border-yellow-500/20">
            <h4 className="text-yellow-400 font-medium mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              Improvement Suggestions
            </h4>
            <ul className="space-y-2">
              {aiFeedback.improvementSuggestions.map((s, i) => (
                <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={handleNextQuestion} className="btn-primary">
              Next Question &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewTab;
