import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header'; // Import the Header component

// --- STYLED COMPONENTS ---
const MainContent = styled(motion.main)`
  /* Push content down past the fixed header height */
  padding-top: 100px; 
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  
  /* Use padding for content safety, similar to Netflix's main scrolling area */
  padding-left: 50px;
  padding-right: 50px;

  /* Optional smooth transition for main content as it loads/changes */
  transition: opacity 0.5s ease-in-out;
`;

// --- REACT COMPONENT ---
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <MainContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </MainContent>
      {/* Footer can go here later */}
    </>
  );
}