import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Base URL para todas as requisições
});

// Rota base para uploads
export const UPLOADS_URL = '/';

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
