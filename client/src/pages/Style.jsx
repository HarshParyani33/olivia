// client/src/pages/Style.jsx

import React, { useState } from 'react'; // <--- MODIFIED: Import useState
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION (Magazine Content) ---
const magazineData = {
  coverTitle: "VOGUE",
  issue: "DECEMBER 2025",
  headline1: "THE UNSTOPPABLE: How She Became Her Own Main Character.",
  headline2: "BREAKING FREE: The Sour Sound That Defined a Generation.",
  featureStory: "Her most iconic looks, analyzed by the fashion elite.",
  photo: "https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765412337/Vogue_croq6g.jpg", // Placeholder photo
  name: "Smriti Bisht",
};

// --- STYLED COMPONENTS ---
const GlamourGlow = keyframes`
  0% { text-shadow: 0 0 5px rgba(255, 51, 102, 0.5); }
  50% { text-shadow: 0 0 10px rgba(255, 51, 102, 1), 0 0 20px rgba(255, 51, 102, 0.5); }
  100% { text-shadow: 0 0 5px rgba(255, 51, 102, 0.5); }
`;

const CoverContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  padding: 40px 0;
  min-height: calc(100vh - 100px);
`;

const VogueTitle = styled(motion.h1)`
  position: absolute;
  top: 20px;
  width: 100%;
  font-family: 'Playfair Display', serif;
  font-size: 5rem;
  font-weight: 900;
  color: var(--color-text);
  text-align: center;
  z-index: 10;
  letter-spacing: 15px;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.8);
`;

// MODIFIED: Positioned headlines to the bottom-left
const HeadlineBlock = styled.div`
  position: absolute;
  bottom: 50px; 
  left: 10px;
  width: 250px;
  z-index: 10;
`;

const NameOverlay = styled(motion.h2)`
  position: absolute;
  bottom: 200px;
  left: 0;
  width: 100%;
  font-family: 'Permanent Marker', cursive;
  font-size: 3.5rem;
  color: var(--color-accent);
  text-align: center;
  z-index: 10;
  transform: rotate(-3deg);
  animation: ${GlamourGlow} 3s infinite;
`;

const Headline = styled(motion.p)`
  font-family: var(--font-primary);
  font-size: 0.9rem;
  font-weight: 700;
  color: white;
  margin-bottom: 15px;
  padding: 5px;
  background: rgba(18, 18, 18, 0.7);
  border-left: 5px solid var(--color-accent);
  cursor: pointer;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(255, 51, 102, 0.2);
  }
`;

const MagazineFrame = styled.div`
  width: 100%;
  max-width: 450px;
  min-height: 700px;
  background-color: black;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);
  border: 2px solid var(--color-accent);
  
  /* New Media Query for mobile devices */
  @media (max-width: 500px) {
    max-width: 90vw; /* Keep it within the screen width */
    min-height: 600px;
    
    /* Adjust Vogue Title to prevent overflow */
    ${VogueTitle} {
        font-size: 4rem;
        letter-spacing: 10px;
    }
    
    /* Move headlines down slightly if header is stacked */
    ${HeadlineBlock} {
        bottom: 70px;
        width: 80%;
    }
  }
`;

const CoverImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 40%),
    url(${props => props.$src}) no-repeat center bottom;
  background-size: cover;
`;

// --- REACT COMPONENT ---
export default function Style() {
    // 1. ADD STATE for the dynamic filter effect
    const [coverFilter, setCoverFilter] = useState('none'); 

  return (
    <CoverContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MagazineFrame>
        
        {/* 2. APPLY DYNAMIC FILTER style to the image */}
        <CoverImage 
          $src={magazineData.photo}
          // Add the transition style directly
          style={{ filter: coverFilter, transition: 'filter 0.5s ease-in-out' }}
          
          // Ensure initial animation blends into the state filter
          initial={{ scale: 1.1, filter: 'grayscale(100%)' }}
          animate={{ 
            scale: 1, 
            filter: coverFilter === 'none' ? 'grayscale(0%)' : coverFilter,
          }}
          transition={{ delay: 0.5, duration: 1.5 }}
        />

        <VogueTitle
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          {magazineData.coverTitle}
        </VogueTitle>
        
        <HeadlineBlock>
          <Headline 
            // 3. UPDATE onClick: Set a bright, saturated filter
            onClick={() => setCoverFilter('saturate(1.5) contrast(1.1)')}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {magazineData.headline1}
          </Headline>
          
          <Headline 
            // 4. UPDATE onClick: Set a moody, sepia filter
            onClick={() => setCoverFilter('grayscale(0.5) sepia(0.3) brightness(0.7)')} 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            {magazineData.headline2}
          </Headline>
        </HeadlineBlock>

        <NameOverlay
          initial={{ y: 50, opacity: 0, rotate: 10 }}
          animate={{ y: 0, opacity: 1, rotate: -3 }}
          transition={{ delay: 1.5, type: 'spring', stiffness: 50 }}
        >
          {magazineData.name}
        </NameOverlay>
        
        <p style={{ position: 'absolute', bottom: '10px', right: '10px', color: 'white', fontSize: '0.8rem', zIndex: 10 }}>
          {magazineData.issue}
        </p>

      </MagazineFrame>
    </CoverContainer>
  );
}