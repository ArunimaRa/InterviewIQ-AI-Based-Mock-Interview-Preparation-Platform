import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, BrainCircuit, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = new URLSearchParams(location.search).get('signup') === 'true';
  
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(isSignup);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isRegistering) {
        await register(formData.name, formData.email, formData.password);
      } else {
        await login(formData.email, formData.password);
      }
      
      // If there's a redirect path saved from ProtectedRoute, go there
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  // Variants for animations
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-darker flex overflow-hidden selection:bg-primary/30 selection:text-white">
      {/* Left Side - Visual/Marketing */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 relative bg-dark border-r border-white/5 items-center justify-center p-12 overflow-hidden"
      >
        {/* Background Gradients & Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] mix-blend-screen"></div>
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="relative z-10 max-w-lg">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-0.5 shadow-2xl shadow-primary/30 mb-8"
          >
            <div className="w-full h-full bg-dark rounded-2xl flex items-center justify-center">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 leading-tight"
          >
            Master Your Next <br /> Technical Interview.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-gray-400 mb-12"
          >
            Join thousands of developers landing offers at top tech companies using our AI-driven mock interviews and targeted analytics.
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {[
              { icon: Sparkles, title: "Real-time AI Feedback", desc: "Get actionable insights on your answers instantly." },
              { icon: ShieldCheck, title: "Tailored to Your Resume", desc: "Questions adapted to your specific experience and skills." },
              { icon: CheckCircle2, title: "Comprehensive Analytics", desc: "Track your progress across multiple technical domains." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUp} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-default border border-transparent hover:border-white/5">
                <div className="p-2 rounded-lg bg-primary/10 text-primary mt-1">
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        {/* Mobile Background Elements */}
        <div className="lg:hidden absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="glass-panel p-8 sm:p-10 relative overflow-hidden group">
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative z-10">
              <div className="mb-10">
                <motion.h2 
                  layout="position"
                  className="text-3xl font-bold mb-2 tracking-tight text-white"
                >
                  {isRegistering ? 'Create Account' : 'Welcome Back'}
                </motion.h2>
                <motion.p layout="position" className="text-gray-400 text-sm">
                  {isRegistering 
                    ? 'Begin your journey to interview mastery today.' 
                    : 'Enter your credentials to access your dashboard.'}
                </motion.p>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm flex items-start gap-3"
                  >
                    <div className="p-1 rounded-full bg-red-500/20 shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                    <p>{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-5">
                <AnimatePresence>
                  {isRegistering && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                      animate={{ opacity: 1, height: 'auto', filter: "blur(0px)" }}
                      exit={{ opacity: 0, height: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.3 }}
                      className="space-y-1.5 overflow-hidden"
                    >
                      <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-primary transition-colors">
                          <User className="h-5 w-5" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="input-field pl-11 bg-dark/40 border-white/5 hover:border-white/10 focus:bg-darker transition-all"
                          placeholder="John Doe"
                          required={isRegistering}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div layout="position" className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-primary transition-colors">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field pl-11 bg-dark/40 border-white/5 hover:border-white/10 focus:bg-darker transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </motion.div>

                <motion.div layout="position" className="space-y-1.5">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-medium text-gray-300">Password</label>
                    <AnimatePresence>
                      {!isRegistering && (
                        <motion.a 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          href="#" 
                          className="text-xs text-primary hover:text-primary-light transition-colors hover:underline underline-offset-4"
                        >
                          Forgot password?
                        </motion.a>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-primary transition-colors">
                      <Lock className="h-5 w-5" />
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="input-field pl-11 bg-dark/40 border-white/5 hover:border-white/10 focus:bg-darker transition-all"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </motion.div>

                <motion.button 
                  layout="position"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isLoading}
                  className="w-full mt-8 relative group overflow-hidden rounded-xl p-[1px]"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-xl opacity-70 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 animate-gradient-xy"></span>
                  <div className="relative flex justify-center items-center gap-2 bg-dark hover:bg-dark/80 transition-colors px-6 py-3.5 rounded-xl text-white font-semibold shadow-inner">
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {isRegistering ? 'Creating...' : 'Authenticating...'}
                      </span>
                    ) : (
                      <>
                        {isRegistering ? 'Create Account' : 'Sign In'}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            </div>
          </div>

          <motion.div layout="position" className="mt-8 text-center">
            <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
              {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              <button 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                }}
                className="text-primary hover:text-white transition-colors font-semibold hover:underline underline-offset-4"
              >
                {isRegistering ? 'Log in instead' : 'Sign up for free'}
              </button>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
