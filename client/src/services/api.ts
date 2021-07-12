import axios, { AxiosRequestConfig } from 'axios';
import { getToken } from './auth';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token.token}`;
    }

    return config
})

export default api;