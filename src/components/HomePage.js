import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';

import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Stack, 
  Paper,
  Avatar
} from '@mui/material';
import { 
  FitnessCenter as FitnessCenterIcon,
  Timer as TimerIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const HomePage = ({ user }) => {
  const navigate = useNavigate();

  const features = [
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
      {/* Hero Section */}
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
          Elevate Your Fitness Journey
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
          A minimalist approach to tracking workouts and achieving your fitness goals
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

      {/* Features Section */}
      <Container maxWidth="lg">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={{ xs: 3, md: 4 }}
          divider={<Divider orientation="vertical" flexItem />}
          sx={{ mb: 10 }}
        >
          {features.map((feature, index) => (
            <Paper 
              key={index}
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                flex: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: 'primary.main'
                }
              }}
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
            </Paper>
          ))}
        </Stack>
      </Container>

      {/* CTA Section */}
      {!user && (
        <Container maxWidth="sm">
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
            <Stack direction="row" spacing={2} justifyContent="center">
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
            </Stack>
          </Paper>
        </Container>
      )}
    </Box>
  );
};

export default HomePage;