import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Page Imports
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Details } from './pages/Details';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Blog } from './pages/Blog';

// Protected Page Imports
import { Dashboard } from './pages/Dashboard';
import { AddPlan } from './pages/AddPlan';
import { ManagePlans } from './pages/ManagePlans';
import { ChatAssistant } from './pages/ChatAssistant';
import { Profile } from './pages/Profile';

// Route Guard Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppContent: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Sticky Transparent Header */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/plans/:id" element={<Details />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/items/add" 
              element={
                <ProtectedRoute>
                  <AddPlan />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/items/manage" 
              element={
                <ProtectedRoute>
                  <ManagePlans />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/chat" 
              element={
                <ProtectedRoute>
                  <ChatAssistant />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            {/* Fallback to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
