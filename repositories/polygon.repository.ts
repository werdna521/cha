import { AxiosResponse } from 'axios';
import polygon from './client/polygon.client';

export default {
  async clear(): Promise<AxiosResponse> {
    return await polygon.post('/new.php');
  },
  async fetch(): Promise<AxiosResponse> {
    return await polygon.get('/fetch.php');
  },
};
