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
          IF AUTHENTICATED: Redirect to /home
          IF NOT AUTHENTICATED: Show the AccessGate
        */}
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
        
        {/* 2. AUTHENTICATED ENTRY POINT: This is the first thing the user sees after login. */}
        <Route path="/home" element={<ProtectedRoute element={<LandingPage />} />} /> {/* 👈 FIXED: Routes to LandingPage */}

        
        {/* 3. PROTECTED ROUTES */}
        <Route path="/episodes" element={<ProtectedRoute element={<TheImpact />} />} />
        
        {/*
          4. Note: I'm assuming you intended to use LoadingScreen as a part of LandingPage.
          If you want it to be a separate page, we need to adjust LandingPage.jsx and the flow.
          Given your files, LandingPage contains the LoadingScreen component, so this route is redundant.
        */}
        {/* <Route path="/LoadingScreen" element={<ProtectedRoute element={<LoadingScreen />} />} /> */}

      </Routes>
    </Router>
  );
}

export default App;