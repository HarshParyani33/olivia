import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Core Components
import Layout from './components/Layout';
import AccessGate from './pages/AccessGate';
import LandingPage from './pages/LandingPage'; 
import TheImpact from './pages/TheImpact'; 
import Profile from './pages/Profile'; 
import Gallery from './pages/Gallery'; 
import Timeline from './pages/Timeline'; // 👈 NEW IMPORT

// A Private Route Wrapper now incorporating the Layout conditional logic
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('protocolOliviaAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (element.type.name === 'LandingPage') {
    return element;
  }
  
  return <Layout>{element}</Layout>; 
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
        
        {/* 2. AUTHENTICATED ENTRY POINT: Cinematic Landing (No Header) */}
        <Route path="/home" element={<ProtectedRoute element={<LandingPage />} />} /> 

        {/* 3. PROTECTED CONTENT ROUTES (All wrapped in Layout with Header) */}
        <Route path="/episodes" element={<ProtectedRoute element={<TheImpact />} />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/gallery" element={<ProtectedRoute element={<Gallery />} />} />
        <Route path="/timeline" element={<ProtectedRoute element={<Timeline />} />} /> {/* 👈 NEW TIMELINE ROUTE */}
        
        {/* Placeholder routes... */}
        {/* <Route path="/locker" element={<ProtectedRoute element={<Locker />} />} /> */}
        {/* <Route path="/future" element={<ProtectedRoute element={<Future />} />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;