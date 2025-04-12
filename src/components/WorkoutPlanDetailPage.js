import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  getWorkoutPlan, 
  updateWorkoutPlan,
  deleteWorkoutPlan 
} from '../api/workoutPlans';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  TextField,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const WorkoutPlanDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedPlan, setEditedPlan] = useState({});

  useEffect(() => {
    const fetchWorkoutPlan = async () => {
      try {
        const data = await getWorkoutPlan(id);
        setWorkoutPlan(data);
        setEditedPlan({
          name: data.name,
          description: data.description
        });
      } catch (err) {
        console.error('Failed to fetch workout plan:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWorkoutPlan();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const updatedPlan = await updateWorkoutPlan(id, editedPlan);
      setWorkoutPlan(updatedPlan);
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update workout plan:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteWorkoutPlan(id);
      navigate('/workout-plans');
    } catch (err) {
      console.error('Failed to delete workout plan:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!workoutPlan) {
    return <div>Workout plan not found</div>;
  }

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/workout-plans')}
          sx={{ mb: 2 }}
        >
          Back to Plans
        </Button>

        {isEditing ? (
          <Box>
            <TextField
              fullWidth
              label="Plan Name"
              name="name"
              value={editedPlan.name}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={editedPlan.description}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              sx={{ mr: 2 }}
            >
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography variant="h4" gutterBottom>
              {workoutPlan.name}
            </Typography>
            <Typography variant="body1" paragraph>
              {workoutPlan.description}
            </Typography>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{ mr: 2 }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        )}

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Exercises in this plan:
        </Typography>
        <List>
          {workoutPlan.exercises && workoutPlan.exercises.length > 0 ? (
            workoutPlan.exercises.map((exercise, index) => (
              <React.Fragment key={exercise.id}>
                <ListItem>
                  <ListItemText
                    primary={exercise.exercise.name}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          Sets: {exercise.custom_sets || exercise.exercise.sets} | 
                          Reps: {exercise.custom_reps || exercise.exercise.reps}
                        </Typography>
                        <br />
                        {exercise.exercise.description}
                      </>
                    }
                  />
                </ListItem>
                {index < workoutPlan.exercises.length - 1 && <Divider />}
              </React.Fragment>
            ))
          ) : (
            <Typography>No exercises in this plan yet.</Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default WorkoutPlanDetailPage;