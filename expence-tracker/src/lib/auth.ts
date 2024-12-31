import axios from 'axios';
import { LoginCredentials, SignupCredentials, AuthUser } from '../types/auth';

const API_URL = 'http://localhost:3000/api';

export const auth = {
  login: async (credentials: LoginCredentials): Promise<AuthUser> => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return { token };
  },

  signup: async (credentials: SignupCredentials): Promise<AuthUser> => {
    const response = await axios.post(`${API_URL}/auth/signup`, credentials);
    const { token } = response.data;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return { token };
  },

  logout: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  },

  initialize: () => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }
};