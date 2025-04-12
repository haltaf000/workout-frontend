import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/api';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const decoded = jwt_decode(token);
          setUser(decoded);
          
          // Verify token is still valid
          await api.get('user/me/');
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };
    
    initializeAuth();
  }, []);

  const login = async (token, refreshToken) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    const decoded = jwt_decode(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);