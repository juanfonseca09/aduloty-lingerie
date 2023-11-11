import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://billowing-sun-8147.fly.dev/api',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const secretToken = import.meta.env.VITE_SECRET_TOKEN;
  console.log(secretToken)
  config.headers.Authorization = `Bearer ${secretToken}`;
  return config;
});

export default instance;
