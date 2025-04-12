import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import ExercisesPage from './components/ExercisesPage';
import WorkoutPlansPage from './components/WorkoutPlansPage';
import WorkoutPlanDetailPage from './components/WorkoutPlanDetailPage';
import WorkoutPlanFormPage from './components/WorkoutPlanFormPage';
import NotFoundPage from './components/NotFoundPage';
import { login, register, getCurrentUser } from './api/auth';
import CircularProgress from '@mui/material/CircularProgress';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token');
        if (token) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('access_token');
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const { access } = await login(username, password);
      localStorage.setItem('access_token', access);
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const handleRegister = async (username, password, email) => {
    try {
      await register(username, password, email);
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar user={user} onLogout={handleLogout} />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage user={user} />} />
              <Route path="/exercises" element={<ExercisesPage user={user} />} />
              <Route path="/login" element={
                user ? <Navigate to="/" replace /> : 
                <LoginPage onLogin={handleLogin} />
              } />
              <Route path="/register" element={
                user ? <Navigate to="/" replace /> : 
                <RegisterPage onRegister={handleRegister} />
              } />
              <Route path="/workout-plans" element={
                user ? <WorkoutPlansPage /> : <Navigate to="/login" replace />
              } />
              <Route path="/workout-plans/new" element={
                user ? <WorkoutPlanFormPage /> : <Navigate to="/login" replace />
              } />
              <Route path="/workout-plans/:id" element={
                user ? <WorkoutPlanDetailPage /> : <Navigate to="/login" replace />
              } />
              <Route path="/404" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;