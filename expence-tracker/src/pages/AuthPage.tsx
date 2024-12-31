import React, { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { SignupForm } from '../components/SignupForm';
import { auth } from '../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      await auth.login({ email, password });
      navigate('/expenses');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      await auth.signup({ email, password });
      navigate('/expenses');
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center mb-8">
        <Wallet className="w-10 h-10 text-blue-600 mr-2" />
        <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
      </div>
      
      <div className="max-w-md w-full">
        {isLogin ? (
          <LoginForm onSubmit={handleLogin} error={error} />
        ) : (
          <SignupForm onSubmit={handleSignup} error={error} />
        )}
        
        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:text-blue-800"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
}