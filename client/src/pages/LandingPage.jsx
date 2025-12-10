// client/src/pages/LandingPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

// --- STYLED COMPONENTS (Keep the Hero styles) ---
const HeroContainer = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 50px 50px 100px;
  position: relative;
  background: 
    linear-gradient(to bottom, transparent 30%, var(--color-background) 100%),
    url('/images/hero-photo.jpg') no-repeat center center;
  background-size: cover;
  background-position: center top; 
`;

const ContentBox = styled(motion.div)`
  max-width: 600px;
  z-index: 10;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  line-height: 1.1;
  margin-bottom: 20px;
  color: var(--color-text);
  font-family: var(--font-primary);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  color: rgba(255, 255, 255, 0.8);
`;

const PlayButton = styled(motion.button)`
  padding: 15px 30px;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: var(--color-accent);
  color: var(--color-background);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 51, 102, 0.6);

  &:hover {
    background-color: #e6004c;
    transform: scale(1.02);
  }
`;

// --- REACT COMPONENT ---
export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  const handlePlayClick = () => {
    navigate('/episodes');
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay: 0.5, 
        duration: 0.8, 
        staggerChildren: 0.3 
      } 
    },
  };

  return (
    <>
      {/* 1. Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* 2. Hero Content (Appears after loading) */}
      {!isLoading && (
        <HeroContainer
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <ContentBox variants={contentVariants}>
            <HeroTitle variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              The Era of [Smriti]
            </HeroTitle>
            <Description variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              "She's the main character. You should be so lucky to be in her presence."
              <br/>
              A special presentation for your birthday.
            </Description>
            <PlayButton
              onClick={handlePlayClick}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ▶️ PLAY EPISODES
            </PlayButton>
          </ContentBox>
        </HeroContainer>
      )}
    </>
  );
}