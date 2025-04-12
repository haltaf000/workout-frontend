import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExercises } from '../api/exercises';
import { createWorkoutPlan } from '../api/workoutPlans';
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  Divider,
  Chip,
  Paper
} from '@mui/material';

const WorkoutPlanFormPage = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleExerciseToggle = (exerciseId) => {
    setSelectedExercises(prev => {
      if (prev.includes(exerciseId)) {
        return prev.filter(id => id !== exerciseId);
      } else {
        return [...prev, exerciseId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const workoutPlanData = {
        ...formData,
        exercises: selectedExercises.map(id => ({ exercise_id: id }))
      };
      await createWorkoutPlan(workoutPlanData);
      navigate('/workout-plans');
    } catch (err) {
      console.error('Failed to create workout plan:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Workout Plan
        </Typography>
        
        <TextField
          fullWidth
          label="Plan Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          sx={{ mb: 3 }}
        />
        
        <TextField
          fullWidth
          label="Description"
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          sx={{ mb: 3 }}
        />
        
        <Typography variant="h6" gutterBottom>
          Select Exercises
        </Typography>
        
        {selectedExercises.length > 0 && (
          <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Selected Exercises ({selectedExercises.length})
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {selectedExercises.map(id => {
                const exercise = exercises.find(e => e.id === id);
                return exercise ? (
                  <Chip 
                    key={id}
                    label={exercise.name}
                    onDelete={() => handleExerciseToggle(id)}
                  />
                ) : null;
              })}
            </Box>
          </Paper>
        )}
        
        <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
          {exercises.map((exercise) => (
            <React.Fragment key={exercise.id}>
              <ListItem>
                <Checkbox
                  checked={selectedExercises.includes(exercise.id)}
                  onChange={() => handleExerciseToggle(exercise.id)}
                />
                <ListItemText
                  primary={exercise.name}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {exercise.muscle_group} | Sets: {exercise.sets} | Reps: {exercise.reps}
                      </Typography>
                      <br />
                      {exercise.description}
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/workout-plans')}
            sx={{ mr: 2 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={selectedExercises.length === 0}
          >
            Create Plan
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default WorkoutPlanFormPage;