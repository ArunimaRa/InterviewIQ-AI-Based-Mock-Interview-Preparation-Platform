import { ArrowRight, Bot, Target, FileText, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30 bg-primary/5"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-sm font-medium text-primary-light">AI-Powered Interview Prep 2.0 is here</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            Master your next interview <br />
            with <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Artificial Intelligence</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Upload your resume, take AI-driven mock interviews, and receive personalized feedback to land your dream job faster than ever.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/login?signup=true" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Start Practicing Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="#features" className="btn-secondary text-lg px-8 py-4">
              See How It Works
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-dark/30 border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our comprehensive suite of tools ensures you're prepared for any technical or behavioral question.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resume Analysis</h3>
              <p className="text-gray-400">
                Upload your resume and let our AI tailor your interview questions based on your specific experience and skills.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent"></div>
              <div className="w-14 h-14 bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-600/20 relative z-10">
                <Bot className="w-7 h-7 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 relative z-10">AI Mock Interviews</h3>
              <p className="text-gray-400 relative z-10">
                Experience lifelike interviews with our voice-enabled AI interviewer that adapts to your responses in real-time.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="glass-panel p-8 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 border border-secondary/20">
                <Target className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Technical MCQs</h3>
              <p className="text-gray-400">
                Test your core knowledge with dynamically generated multiple-choice questions across various programming languages and concepts.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
