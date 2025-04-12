import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  Paper,
  Avatar,
  CircularProgress
} from '@mui/material';
import { 
  FitnessCenter as FitnessCenterIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  const features = user ? [
    {
      icon: <FitnessCenterIcon />,
      title: "Your Workout Plans",
      description: "View and manage your custom workout routines",
      action: () => navigate('/workout-plans')
    },
    {
      icon: <TimerIcon />,
      title: "Track Progress",
      description: "Monitor your fitness journey over time",
      action: () => navigate('/progress')
    },
    {
      icon: <TrendingUpIcon />,
      title: "Exercise Library",
      description: "Browse our collection of exercises",
      action: () => navigate('/exercises')
    }
  ] : [
    {
      icon: <FitnessCenterIcon />,
      title: "Personalized Plans",
      description: "Workouts tailored to your goals and fitness level"
    },
    {
      icon: <TimerIcon />,
      title: "Efficient Workouts",
      description: "Maximize results in minimal time"
    },
    {
      icon: <TrendingUpIcon />,
      title: "Progress Tracking",
      description: "Visualize your improvements over time"
    }
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md" sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 800, 
            fontSize: { xs: '2.25rem', md: '3rem' },
            mb: 3,
            lineHeight: 1.2
          }}
        >
          {user ? `Welcome Back, ${user.username}!` : 'Elevate Your Fitness Journey'}
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            mb: 4,
            fontSize: { xs: '1rem', md: '1.125rem' }
          }}
        >
          {user ? 'Ready for your next workout?' : 'A minimalist approach to tracking workouts and achieving your fitness goals'}
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => user ? navigate('/workout-plans') : navigate('/register')}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: '8px',
            fontWeight: 600
          }}
        >
          {user ? 'View Dashboard' : 'Start Free Trial'}
        </Button>
      </Container>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper 
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '12px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: 'primary.main',
                    cursor: feature.action ? 'pointer' : 'default'
                  }
                }}
                onClick={feature.action}
              >
                <Avatar sx={{ 
                  bgcolor: 'transparent', 
                  color: 'primary.main',
                  width: 56, 
                  height: 56, 
                  mb: 2,
                  mx: 'auto'
                }}>
                  {feature.icon}
                </Avatar>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
                {feature.action && (
                  <Button 
                    size="small" 
                    endIcon={<ArrowForwardIcon />} 
                    sx={{ mt: 2, alignSelf: 'flex-start' }}
                  >
                    Explore
                  </Button>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {!user && (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
          <Paper 
            elevation={0}
            sx={{
              p: 4,
              textAlign: 'center',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '12px',
              bgcolor: 'background.paper'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
              Ready to transform your fitness?
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Join our community of fitness enthusiasts today
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{ borderRadius: '8px' }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{ borderRadius: '8px' }}
              >
                Create Account
              </Button>
            </Box>
          </Paper>
        </Container>
      )}
    </Box>
  );
};

export default HomePage;