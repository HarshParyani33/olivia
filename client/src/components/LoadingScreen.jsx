import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- KEYFRAMES ---
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
`;

const explode = keyframes`
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(5); opacity: 0; }
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


// --- REACT COMPONENT ---
export default function LoadingScreen({ onComplete }) {
  // Use Framer Motion's 'animate' prop for the loading sequence
  const loadingSequence = async (controls) => {
    // 1. Display text for a duration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 2. Explode the center point
    controls.start({
      scale: 5,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    });
    
    // 3. Complete the loading state
    await new Promise(resolve => setTimeout(resolve, 500));
    onComplete();
  };

  return (
    <LoadingWrapper
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }} // Keep wrapper opaque until explosion
      onAnimationStart={loadingSequence}
    >
      <Text>
        // LOADING MAIN CHARACTER //
      </Text>
      <Explosion 
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 0, opacity: 1 }} // Placeholder to control explosion later
      />
    </LoadingWrapper>
  );
}