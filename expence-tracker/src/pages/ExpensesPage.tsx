import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpenseForm } from '../components/ExpenseForm';
import { ExpenseList } from '../components/ExpenseList';
import { useExpenses } from '../hooks/useExpenses';
import { Wallet, LogOut } from 'lucide-react';
import { auth } from '../lib/auth';

export function ExpensesPage() {
  const { expenses, loading, error, addExpense, deleteExpense } = useExpenses();
  const navigate = useNavigate();
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    auth.logout();
    navigate('/auth');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Wallet className="w-8 h-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
                <span className="text-sm text-gray-500">Total Expenses:</span>
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  ${totalExpenses.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg shadow-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <ExpenseForm onSubmit={addExpense} />
            </div>
            <div className="md:col-span-2">
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}