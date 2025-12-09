import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Layout for protected pages
import Layout from './components/Layout'; 
import AccessGate from './pages/AccessGate';
import LandingPage from './pages/LandingPage'; 
import TheImpact from './pages/TheImpact'; 
import Profile from './pages/Profile'; // 👈 NEW IMPORT

// A Private Route Wrapper now incorporating the Layout
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('protocolOliviaAuth') === 'true';
  
  // If authenticated, wrap the requested element (page) in the Layout.
  // If NOT authenticated, redirect to the login page.
  return isAuthenticated ? (
    <Layout>{element}</Layout> 
  ) : (
    <Navigate to="/" replace />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('protocolOliviaAuth') === 'true'
  );

  const setAuthenticated = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <Routes>
        {/* 1. ROOT PATH: Handles access check */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace /> 
            ) : (
              <AccessGate setAuthenticated={setAuthenticated} />
            )
          }
        />
        
        {/* 2. AUTHENTICATED ENTRY POINT: Landing Page */}
        <Route path="/home" element={<ProtectedRoute element={<LandingPage />} />} /> 

        {/* 3. PROTECTED CONTENT ROUTES */}
        <Route path="/episodes" element={<ProtectedRoute element={<TheImpact />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> {/* 👈 NEW ROUTE */}
        {/* Add the rest of your protected routes here... */}
        {/* <Route path="/gallery" element={<ProtectedRoute element={<Gallery />} />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;