import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('🔄 [AUTH CONTEXT] Initializing...');
    
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    console.log('🔍 [AUTH CONTEXT] Token from storage:', token ? 'EXISTS' : 'NULL');
    console.log('🔍 [AUTH CONTEXT] User data from storage:', userData);
    
    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      console.log('✅ [AUTH CONTEXT] User loaded:', parsedUser);
      console.log('📋 [AUTH CONTEXT] User major:', parsedUser.major);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    console.log('🔐 [AUTH CONTEXT] Login called');
    console.log('📥 [AUTH CONTEXT] User data:', userData);
    console.log('📋 [AUTH CONTEXT] Major:', userData.major);
    console.log('🔑 [AUTH CONTEXT] Token:', token ? 'EXISTS' : 'NULL');
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    
    console.log('💾 [AUTH CONTEXT] Data saved to localStorage');
    console.log('🔍 [AUTH CONTEXT] Verify save:', localStorage.getItem('user'));
    
    setUser(userData);
    console.log('✅ [AUTH CONTEXT] User state updated');
  };

  const logout = () => {
    console.log('🚪 [AUTH CONTEXT] Logout called');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    console.log('✅ [AUTH CONTEXT] User logged out');
  };

  const isAuthenticated = () => {
    const hasToken = !!localStorage.getItem('token');
    console.log('🔍 [AUTH CONTEXT] Is authenticated:', hasToken);
    return hasToken;
  };

  const getToken = () => {
    return localStorage.getItem('token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated, 
      getToken,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};