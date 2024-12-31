import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { ExpensesPage } from './pages/ExpensesPage';
import { auth } from './lib/auth';

// Initialize authentication state
auth.initialize();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/" element={<Navigate to="/expenses" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;