import React, { useState } from 'react'; // Removed useEffect since AccessGate is handling local storage check
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import AccessGate from './pages/AccessGate';
import Home from './pages/Home';
import TheImpact from './pages/TheImpact'; // Import the new placeholder page

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
        
        {/* Protected Routes */}
        <Route path="/episodes" element={<ProtectedRoute element={<TheImpact />} />} />
        {/* Add placeholders for other routes as we build them: */}
        {/* <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} /> */}
        {/* <Route path="/gallery" element={<ProtectedRoute element={<Gallery />} />} /> */}
        {/* <Route path="/timeline" element={<ProtectedRoute element={<Timeline />} />} /> */}
        {/* <Route path="/locker" element={<ProtectedRoute element={<Locker />} />} /> */}
        {/* <Route path="/future" element={<ProtectedRoute element={<Future />} />} /> */}
        {/* <Route path="/guestbook" element={<ProtectedRoute element={<Guestbook />} />} /> */}
        {/* <Route path="/style" element={<ProtectedRoute element={<Style />} />} /> */}

      </Routes>
    </Router>
  );
}

export default App;