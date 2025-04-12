import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWorkoutPlans, deleteWorkoutPlan } from '../api/workoutPlans';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Paper,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Add as AddIcon, 
  FitnessCenter as FitnessCenterIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const PlanCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4]
  }
}));

const WorkoutPlansPage = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const data = await getWorkoutPlans();
        setWorkoutPlans(data);
      } catch (err) {
        console.error('Failed to fetch workout plans:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkoutPlans();
  }, []);

  const handleMenuOpen = (event, plan) => {
    setAnchorEl(event.currentTarget);
    setSelectedPlan(plan);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPlan(null);
  };

  const handleDelete = async () => {
    try {
      await deleteWorkoutPlan(selectedPlan.id);
      setWorkoutPlans(workoutPlans.filter(plan => plan.id !== selectedPlan.id));
    } catch (err) {
      console.error('Failed to delete workout plan:', err);
    } finally {
      handleMenuClose();
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4
      }}>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          My Workout Plans
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/workout-plans/new')}
          sx={{ borderRadius: '50px' }}
        >
          New Plan
        </Button>
      </Box>

      {workoutPlans.length === 0 ? (
        <Paper elevation={0} sx={{ 
          p: 4, 
          textAlign: 'center',
          border: '1px dashed',
          borderColor: 'divider'
        }}>
          <FitnessCenterIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No workout plans yet
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => navigate('/workout-plans/new')}
            sx={{ mt: 2 }}
          >
            Create Your First Plan
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {workoutPlans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <PlanCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {plan.name}
                    </Typography>
                    <IconButton onClick={(e) => handleMenuOpen(e, plan)}>
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                    {plan.description || 'No description'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="caption">
                      Created: {new Date(plan.created_at).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                      Exercises:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {plan.exercises?.slice(0, 3).map((ex, idx) => (
                        <Chip 
                          key={idx}
                          label={ex.exercise.name}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                      {plan.exercises?.length > 3 && (
                        <Chip label={`+${plan.exercises.length - 3}`} size="small" />
                      )}
                    </Box>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                  <Button
                    size="small"
                    onClick={() => navigate(`/workout-plans/${plan.id}`)}
                  >
                    View Details
                  </Button>
                </CardActions>
              </PlanCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {
          navigate(`/workout-plans/${selectedPlan?.id}`);
          handleMenuClose();
        }}>
          View Details
        </MenuItem>
        <MenuItem onClick={() => {
          navigate(`/workout-plans/${selectedPlan?.id}/edit`);
          handleMenuClose();
        }}>
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default WorkoutPlansPage;