import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
   baseURL: 'http://192.168.137.233:5000',
 // Make sure port matches your backend server
  timeout: 5000,
});

// Add token to every request if available
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (err) {
      console.error('Token fetch error:', err);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default api;
