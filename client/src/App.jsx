import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import AccessGate from './pages/AccessGate';
import Home from './pages/Home';
// import TheImpact from './pages/TheImpact'; // Will create these later

// A Private Route Wrapper to check authentication status
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('protocolOliviaAuth') === 'true';
  return isAuthenticated ? element : <Navigate to="/" replace />;
};

function App() {
  // Use state to track current authentication status (for immediate UI update)
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('protocolOliviaAuth') === 'true'
  );

  // Function to pass to AccessGate to update auth status
  const setAuthenticated = (status) => {
    setIsAuthenticated(status);
  };

  return (
    <Router>
      <Routes>
        {/*
          If authenticated, root path shows Home.
          If NOT authenticated, root path shows AccessGate.
        */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <AccessGate setAuthenticated={setAuthenticated} />
            )
          }
        />
        {/*
          Example of other protected routes, which will always redirect to '/' 
          (which then renders AccessGate) if not authenticated.
        */}
        {/* <Route path="/episodes" element={<ProtectedRoute element={<TheImpact />} />} /> */}
        {/* Add all other routes here: /profile, /gallery, etc. */}
      </Routes>
    </Router>
  );
}

export default App;