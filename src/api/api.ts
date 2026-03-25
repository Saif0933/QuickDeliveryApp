import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.3:5000/api/v1/minta-fresh',
  // baseURL: 'https://api.mintarestro.com/api/v1/minta-fresh',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

import { navigate } from '../navigation/navigationRef';

// 🔐 Attach token before each request
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚪 Force logout on 401 Unauthorized
api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        try {
          // Clear auth data
          await AsyncStorage.removeItem('authToken');
          await AsyncStorage.removeItem('userId');
          
          // Redirect to login
          navigate('Login');
        } catch (storageError) {
          console.error('Logout failed:', storageError);
        }
      }
      return Promise.reject(error);
    }
);

export default api;