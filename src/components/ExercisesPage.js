import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExercises } from '../api/exercises';
import { 
  Container, 
  Typography, 
  Box, 
  TextField,
  Chip,
  CircularProgress,
  Paper,
  Button,
  Avatar,
  Grid
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const ExerciseCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[4],
    transform: 'translateY(-2px)'
  }
}));

const ExercisesPage = ({ user }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getExercises();
        setExercises(data);
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exercise.muscle_group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '200px'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3 
      }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: 'primary.main'
          }}
        >
          Exercise Library
        </Typography>
        {user && (
          <Button 
            variant="contained"
            onClick={() => navigate('/workout-plans/new')}
          >
            Create Workout Plan
          </Button>
        )}
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search exercises..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
        }}
        sx={{ 
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: '50px'
          }
        }}
      />

      {filteredExercises.length === 0 ? (
        <Paper elevation={0} sx={{ 
          p: 4, 
          textAlign: 'center',
          backgroundColor: 'background.paper'
        }}>
          <FitnessCenterIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6">
            No exercises found
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {searchTerm ? 'Try a different search term' : 'No exercises available'}
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {filteredExercises.map((exercise) => (
            <Grid item xs={12} sm={6} key={exercise.id}>
              <ExerciseCard elevation={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={`https://source.unsplash.com/random/100x100/?${exercise.muscle_group},exercise`}
                    sx={{ 
                      width: 60, 
                      height: 60,
                      backgroundColor: 'primary.main',
                      color: 'primary.contrastText'
                    }}
                  >
                    {exercise.muscle_group.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {exercise.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                      <Chip 
                        label={exercise.muscle_group} 
                        size="small" 
                        color="primary"
                        variant="outlined"
                      />
                      <Chip 
                        label={`${exercise.sets}x${exercise.reps}`}
                        size="small"
                      />
                    </Box>
                  </Box>
                </Box>
              </ExerciseCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ExercisesPage;