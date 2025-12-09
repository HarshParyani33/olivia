import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages (Update the Home import to LandingPage)
import AccessGate from './pages/AccessGate';
import LandingPage from './pages/LandingPage'; // 👈 New Landing Page Component
import TheImpact from './pages/TheImpact'; 
// import other pages later...

// A Private Route Wrapper to check authentication status
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('protocolOliviaAuth') === 'true';
  return isAuthenticated ? element : <Navigate to="/" replace />;
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
        {/*
          1. ROOT PATH: Check Auth Status
          If authenticated, navigate to the first main page /home (or /landing-page). 
          If NOT authenticated, stay on the AccessGate.
        */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace /> // Redirect to the main content
            ) : (
              <AccessGate setAuthenticated={setAuthenticated} />
            )
          }
        />
        
        {/* 2. AUTHENTICATED ENTRY POINT: This is the first thing the user sees after login.
        */}
        <Route path="/home" element={<ProtectedRoute element={<LandingPage />} />} />

        {/* 3. PROTECTED ROUTES (The rest of the Sitemap)
        */}
        <Route path="/episodes" element={<ProtectedRoute element={<TheImpact />} />} />
        {/* <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> */}
        {/* <Route path="/gallery" element={<ProtectedRoute element={<Gallery />} />} /> */}
        {/* etc. */}

      </Routes>
    </Router>
  );
}

export default App;