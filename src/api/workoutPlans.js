import api from './api';

export const getWorkoutPlans = async () => {
  const response = await api.get('workout-plans/');
  return response.data;
};

export const getWorkoutPlan = async (id) => {
  const response = await api.get(`workout-plans/${id}/`);
  return response.data;
};

export const createWorkoutPlan = async (workoutPlanData) => {
  const response = await api.post('workout-plans/', workoutPlanData);
  return response.data;
};

export const updateWorkoutPlan = async (id, workoutPlanData) => {
  const response = await api.put(`workout-plans/${id}/`, workoutPlanData);
  return response.data;
};

export const deleteWorkoutPlan = async (id) => {
  const response = await api.delete(`workout-plans/${id}/`);
  return response.data;
};