import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000' 
});

// Interceptor to add JWT token to any request if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;