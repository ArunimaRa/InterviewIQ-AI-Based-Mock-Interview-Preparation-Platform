import { Link, useNavigate } from 'react-router-dom';
import { BrainCircuit, LogIn, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 glass-panel border-b-0 border-x-0 border-t-0 rounded-none bg-darker/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-primary to-purple-600 rounded-xl group-hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              InterviewIQ
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
            <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
            <div className="h-6 w-px bg-white/10"></div>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>
                <div className="flex items-center gap-3 pl-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 p-0.5">
                    <div className="w-full h-full bg-dark rounded-full flex items-center justify-center uppercase text-xs font-bold text-white">
                      {user?.name?.substring(0, 2) || 'U'}
                    </div>
                  </div>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                  <LogIn className="w-4 h-4" />
                  <span>Log in</span>
                </Link>
                <Link to="/login?signup=true" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </nav>
          
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-darker/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">Features</Link>
              <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">Pricing</Link>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-base font-medium text-red-400 hover:text-red-300 hover:bg-white/5 rounded-md transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Log out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors">
                    <LogIn className="w-5 h-5" />
                    <span>Log in</span>
                  </Link>
                  <Link to="/login?signup=true" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center btn-primary mt-4">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
