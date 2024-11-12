import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { OnboardingProvider } from './contexts/OnboardingContext';
import ErrorBoundary from './components/ErrorBoundary';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import Dashboard from './components/Dashboard';
import CommandCenter from './components/CommandCenter';
import Calendar from './components/Calendar';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import Analytics from './components/Analytics';
import Social from './components/Social';
import Library from './components/Library';
import AIInsights from './components/AIInsights';
import Campaigns from './components/Campaigns';
import CampaignDetail from './components/CampaignDetail';
import Settings from './components/Settings';
import NewOnboardingFlow from './components/onboarding/NewOnboardingFlow';
import AIMarketingStrategy from './components/strategy/AIMarketingStrategy';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!user?.onboardingCompleted && window.location.pathname !== '/onboarding' && window.location.pathname !== '/strategy') {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <OnboardingProvider>
            <Routes>
              {/* Auth Routes */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Onboarding Routes */}
              <Route 
                path="/onboarding" 
                element={
                  <ProtectedRoute>
                    <NewOnboardingFlow />
                  </ProtectedRoute>
                } 
              />
              
              {/* Strategy Route */}
              <Route 
                path="/strategy" 
                element={
                  <ProtectedRoute>
                    <AIMarketingStrategy />
                  </ProtectedRoute>
                } 
              />

              {/* Protected Routes */}
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
                <Route index element={<CommandCenter />} />
                <Route path="calendar" element={<Calendar />} />
                <Route path="calendar/:id" element={<Calendar />} />
                <Route path="create" element={<CreatePost />} />
                <Route path="create/post/:id" element={<EditPost />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="analytics/:tab" element={<Analytics />} />
                <Route path="social" element={<Social />} />
                <Route path="library" element={<Library />} />
                <Route path="insights" element={<AIInsights />} />
                <Route path="campaigns" element={<Campaigns />} />
                <Route path="campaigns/:id" element={<CampaignDetail />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </OnboardingProvider>
        </AuthProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;