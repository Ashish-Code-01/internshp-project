import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';
import Layout from './components/Layout';

type AuthMode = 'login' | 'signup';
type AppPage = 'dashboard' | 'leaderboard';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentPage, setCurrentPage] = useState<AppPage>('dashboard');

  // Extract authentication content to a separate component
  const renderAuthContent = () =>
    authMode === 'login' ? (
      <LoginPage onSwitchToSignup={() => setAuthMode('signup')} />
    ) : (
      <SignupPage onSwitchToLogin={() => setAuthMode('login')} />
    );

  if (!isAuthenticated) {
    return renderAuthContent();
  }

  return (
    <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
      {currentPage === 'dashboard' ? <Dashboard /> : <Leaderboard />}
    </Layout>
  );
};

// Use arrow function for consistency
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;