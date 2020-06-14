import axios, { AxiosInstance } from 'axios';

const client: AxiosInstance = axios.create({
  baseURL: 'https://melissa205.000webhostapp.com/recipe',
  headers: { 'Content-Type': 'application/json' },
});

export default client;
