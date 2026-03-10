import axios from 'axios';

// Base API instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + '/api', // Dựa vào README, Backend đang chạy cổng 5000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor tự động đính token vào mọi request
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
