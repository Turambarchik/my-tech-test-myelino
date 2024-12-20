import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const baseURL = 'https://api.myelino.com';

const axiosClient: AxiosInstance = axios.create({
  baseURL: `${baseURL}/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const cookies = await AsyncStorage.getItem('cookies');
    if (cookies && cookies.trim() !== '') {
      config.headers.Cookie = cookies;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  async (response) => {
    const setCookieHeader = response.headers['set-cookie'];
    if (setCookieHeader && Array.isArray(setCookieHeader)) {
      const cookies = setCookieHeader
        .map((cookie) => cookie.split(';')[0])
        .join('; ');
      await AsyncStorage.setItem('cookies', cookies);
    }
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export { axiosClient };
