import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box
} from '@mui/material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Navbar = ({ user }) => {
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0} sx={{ 
      bgcolor: 'background.paper',
      color: 'text.primary',
      borderBottom: '1px solid',
      borderColor: 'divider'
    }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FitnessCenterIcon sx={{ mr: 1, color: 'primary.main' }} />
          <Typography 
            variant="h6" 
            component={Link} 
            to="/"
            sx={{ 
              fontWeight: 700,
              textDecoration: 'none',
              color: 'inherit'
            }}
          >
            FitTrack
          </Typography>
        </Box>

        <Box>
          {user ? (
            <Button 
              component={Link} 
              to="/workout-plans"
              variant={location.pathname === '/workout-plans' ? 'contained' : 'text'}
              sx={{ ml: 2 }}
            >
              My Plans
            </Button>
          ) : (
            <>
              <Button 
                component={Link} 
                to="/login"
                variant={location.pathname === '/login' ? 'contained' : 'text'}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register"
                variant={location.pathname === '/register' ? 'contained' : 'outlined'}
                sx={{ ml: 2 }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;