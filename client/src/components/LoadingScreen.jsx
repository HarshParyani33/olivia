import React, { useEffect } from 'react'; // 👈 Import useEffect
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- KEYFRAMES (Keeping these for visual flair) ---
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
`;

// --- STYLED COMPONENTS ---
const LoadingWrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Text = styled.p`
  font-size: 2rem;
  color: var(--color-accent);
  margin-bottom: 20px;
  animation: ${blink} 1s step-end infinite;
  font-family: var(--font-secondary);
  text-shadow: 0 0 5px var(--color-accent);
`;

const Explosion = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  background-color: var(--color-accent);
  border-radius: 50%;
  opacity: 0;
`;


// --- REACT COMPONENT (Simplified Logic) ---
export default function LoadingScreen({ onComplete }) {
  
  // Total animation time (e.g., 3.5 seconds)
  const TOTAL_DURATION = 3500; 

  useEffect(() => {
    // Automatically call onComplete after the duration passes
    const timer = setTimeout(onComplete, TOTAL_DURATION); 

    // Cleanup function
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <LoadingWrapper
      initial={{ opacity: 1 }}
      // Use Framer Motion to fade out the entire screen
      animate={{ opacity: 0 }}
      transition={{ delay: 3, duration: 0.5 }} // Delay 3s, then fade for 0.5s
    >
      <Text>
        // LOADING MAIN CHARACTER //
      </Text>
      {/* The Explosion is now animated purely via props.
        It starts small, waits for 3s (delay), then scales up and fades out quickly.
      */}
      <Explosion 
        initial={{ scale: 0, opacity: 1 }}
        animate={{ 
            scale: 5, 
            opacity: 0,
        }} 
        transition={{ 
            delay: 3, 
            duration: 0.5, 
            ease: 'easeOut' 
        }} 
      />
    </LoadingWrapper>
  );
}