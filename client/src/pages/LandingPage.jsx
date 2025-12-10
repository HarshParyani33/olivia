// client/src/pages/LandingPage.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import VideoPlayer from '../components/VideoPlayer';

// --- STYLED COMPONENTS ---

// NEW: Styled component for background video functionality
const BackgroundVideoPlayer = styled(VideoPlayer)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* CRUCIAL: Ensures video covers the entire container */
  z-index: 1; /* Behind content box (z-index 10) and gradient overlay (z-index 5) */
  /* Ensure no residual styles leak through */
  max-width: none; 
  border: none;
  box-shadow: none;
  border-radius: 0;
  opacity: 0.8; /* Dim the video slightly */
`;


const HeroContainer = styled(motion.div)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* Push content to the bottom-left */
  padding: 50px 50px 100px;
  position: relative;
  
  /* MODIFIED: Removed static image background and set base color */
  background-color: var(--color-background); 
  
  /* ADDED: Dark gradient overlay for text readability, similar to Netflix */
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* Strong black gradient from bottom up, fading out slightly */
    background: linear-gradient(
        to bottom, 
        rgba(18, 18, 18, 0.1) 0%, 
        rgba(18, 18, 18, 0.7) 70%, 
        rgba(18, 18, 18, 1) 100%
    );
    z-index: 5; /* Above video (z-index 1) but below content (z-index 10) */
  }
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

  // WARNING: This link must be the direct MP4/WebM URL from Cloudinary, not the /embed/ link.
  const TRAILER_URL = "";

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
          {/* ADDED: Render the Video Player in the background */}
          <BackgroundVideoPlayer
              src={TRAILER_URL}
              title="Birthday Trailer"
              controls={false} /* Hidden controls for cinematic look */
              loop={true}
              autoPlay={true}
              muted={false} /* REQUESTED: No mute, but risks blocking autoplay */
          />

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