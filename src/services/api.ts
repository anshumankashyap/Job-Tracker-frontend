import axios from 'axios';
import Cookies from 'js-cookie';
import { JobApplication } from '@/types';

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = Cookies.get('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto logout on 401
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth
export default

export const registerUser = (data: { username: string; email: string; password: string }) =>
  API.post('/auth/register/', data);

export const loginUser = (data: { username: string; password: string }) =>
  API.post('/auth/login/', data);

export const getMe = () => API.get('/auth/me/');

// Applications
export const getApplications = () => API.get('/applications/');
export const createApplication = (data: FormData) =>
  API.post('/applications/', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateApplication = (id: number, data: Partial<JobApplication> | FormData) =>
  API.patch(`/applications/${id}/`, data);
export const deleteApplication = (id: number) => API.delete(`/applications/${id}/`);

// AI Analyzer
export const analyzeResume = (id: number, jobDescription: string) =>
  API.post(`/ai-analyzer/${id}/analyze/`, { job_description: jobDescription });

