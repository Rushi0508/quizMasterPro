import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Config from 'react-native-config';
import {AuthUser} from '../types/AuthUser';

const api = axios.create({
  baseURL:
    'https://7325-2401-4900-1c80-cdea-fded-d631-4e76-2d3c.ngrok-free.app',
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
});

api.interceptors.request.use(
  async config => {
    try {
      const userString = await AsyncStorage.getItem('user');

      if (userString) {
        const user = JSON.parse(userString) as AuthUser;
        config.headers.Authorization = `Bearer ${user?.token}`;
      }

      return config;
    } catch (error) {
      console.error('Error fetching user:', error);
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error);
  },
);
export default api;
