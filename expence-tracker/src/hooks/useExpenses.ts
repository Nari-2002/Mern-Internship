import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { Expense, NewExpense } from '../types/expense';

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  async function fetchExpenses() {
    try {
      const data = await api.expenses.getAll();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch expenses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function addExpense(expense: NewExpense) {
    try {
      const newExpense = await api.expenses.create(expense);
      setExpenses([newExpense, ...expenses]);
      setError(null);
    } catch (err) {
      setError('Failed to add expense');
      console.error(err);
    }
  }

  async function deleteExpense(id: string) {
    try {
      await api.expenses.delete(id);
      setExpenses(expenses.filter(expense => expense.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete expense');
      console.error(err);
    }
  }

  return {
    expenses,
    loading,
    error,
    addExpense,
    deleteExpense
  };
}