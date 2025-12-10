// client/src/components/Layout.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Header from './Header'; 

// --- STYLED COMPONENTS ---
const MainContent = styled(motion.main)`
  /* Desktop Padding */
  padding-top: 100px; 
  min-height: 100vh;
  background-color: var(--color-background);
  color: var(--color-text);
  
  padding-left: 50px;
  padding-right: 50px;

  /* MOBILE FIX: Increase padding-top significantly because the Header stacks */
  @media (max-width: 768px) {
    padding-top: 180px; 
    padding-left: 15px;
    padding-right: 15px;
  }
  
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
    </>
  );
}