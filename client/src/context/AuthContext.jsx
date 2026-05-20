import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, register as registerService } from '../services/auth.service';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // Basic token expiration check can be added here if needed
        setUser(parsedUser);
        setToken(storedToken);
      } catch (error) {
        console.error("Failed to parse user info", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    handleAuthSuccess(data);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await registerService(name, email, password);
    handleAuthSuccess(data);
    return data;
  };

  const handleAuthSuccess = (data) => {
    setUser(data);
    setToken(data.token);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  };

  if (loading) {
    return <div className="min-h-screen bg-darker flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
