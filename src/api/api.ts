import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://192.168.1.10:5000/api/v1/minta-fresh',
  // baseURL: 'https://api.mintafresh.com/api/v1/minta-fresh',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Attach token before each request
// api.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem('vendorToken');
//     if (token) {
//       config.headers.Authorization = Bearer ${token};
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

export default api;