import api from './api';

export const getExercises = async () => {
  const response = await api.get('exercises/');
  return response.data;
};

export const getExercise = async (id) => {
  const response = await api.get(`exercises/${id}/`);
  return response.data;
};

export const createExercise = async (exerciseData) => {
  const response = await api.post('exercises/', exerciseData);
  return response.data;
};