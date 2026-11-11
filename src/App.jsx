import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import { BmtProvider } from './context/BmtContext';
import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BmtProvider>
          <Router>
            <AppRoutes />
          </Router>
        </BmtProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
