import api from './api';

export const login = async (username, password) => {
  const response = await api.post('token/', { username, password });
  return response.data;
};

export const register = async (username, password, email) => {
  const response = await api.post('register/', { username, password, email });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get('user/me/');
  return response.data;
};