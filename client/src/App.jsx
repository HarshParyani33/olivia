import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Core Components
import Layout from './components/Layout'; // Wraps pages that need the Header
import AccessGate from './pages/AccessGate';
import LandingPage from './pages/LandingPage'; 
import TheImpact from './pages/TheImpact'; 
import Profile from './pages/Profile'; 
import Gallery from './pages/Gallery'; 
import Timeline from './pages/Timeline';
import Locker from './pages/Locker'; 
import Future from './pages/Future';

// A Private Route Wrapper that applies Layout conditionally
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('protocolOliviaAuth') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If the element is the LandingPage (full-screen cinematic entry), return it directly 
  // without the Layout (Header).
  if (element.type.name === 'LandingPage') {
    return element;
  }
  
  // All other protected pages get the Header wrapped in the Layout.
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
        <Route path="/timeline" element={<ProtectedRoute element={<Timeline />} />} />
        <Route path="/locker" element={<ProtectedRoute element={<Locker />} />} /> {/* 👈 LOCKER ROUTE ADDED */}
        <Route path="/future" element={<ProtectedRoute element={<Future />} />} />
        {/* Placeholder routes for remaining pages */}
        {/* <Route path="/future" element={<ProtectedRoute element={<Future />} />} /> */}
        {/* <Route path="/guestbook" element={<ProtectedRoute element={<Guestbook />} />} /> */}
        {/* <Route path="/style" element={<ProtectedRoute element={<Style />} />} /> */}
        
      </Routes>
    </Router>
  );
}

export default App;