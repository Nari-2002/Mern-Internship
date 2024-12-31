import axios from 'axios';
import { Expense, NewExpense } from '../types/expense';

const API_URL = 'http://localhost:3000/api';

// Configure axios to include token in all requests
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  expenses: {
    getAll: async (): Promise<Expense[]> => {
      const response = await axios.get(`${API_URL}/expenses`);
      return response.data;
    },
    
    create: async (expense: NewExpense): Promise<Expense> => {
      const response = await axios.post(`${API_URL}/expenses`, expense);
      return response.data;
    },
    
    delete: async (id: string): Promise<void> => {
      await axios.delete(`${API_URL}/expenses/${id}`);
    }
  }
};