// client/src/pages/Gallery.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import the new OGL-based component
import CircularGallery from '../components/CircularGallery'; 

// --- DATA SIMULATION ---
// IMPORTANT: Use relative paths for images, and ensure they are placed in your public folder
// Increased items to 10 for better loop consistency
const galleryItems = [
  { image: '/WIN_20240313_14_31_39_Pro.jpg', text: 'Sweet Memories' },
  { image: '/images/polaroid-2.jpg', text: 'Road Trip Vibes' },
  { image: '/images/polaroid-3.jpg', text: 'Sour Face Era' },
  { image: '/images/polaroid-4.jpg', text: 'Late Night Talks' },
  { image: '/images/polaroid-5.jpg', text: 'Hello Kitty Mood' },
  { image: '/images/polaroid-6.jpg', text: 'Good 4 U' }, 
  { image: '/images/polaroid-7.jpg', text: 'Deja Vu Moment' }, 
  { image: '/images/polaroid-8.jpg', text: 'Fave Hoodie' },
  { image: '/images/polaroid-9.jpg', text: 'Driving License' },
  { image: '/images/polaroid-10.jpg', text: 'Happier' },
];

// --- STYLED COMPONENTS ---

const GalleryPageContainer = styled(motion.div)`
  /* The Layout component already gives us 100px padding-top. 
     We set min-height to fill the viewport below the header. */
  min-height: calc(100vh - 100px); 
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const GalleryTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--color-accent);
  margin: 30px 0;
  font-family: var(--font-primary);
  text-align: center;
  z-index: 10;
`;

const GalleryCanvasWrapper = styled.div`
  /* CRUCIAL: The canvas needs a defined height relative to the container. */
  width: 100%;
  /* Use the viewport height minus the space needed for the Header (100px) and the Title/margin (50px) */
  height: calc(100vh - 150px); 
  position: relative; 
  padding: 0 50px; 
`;


// --- REACT COMPONENT ---
export default function Gallery() {

  // Configuration for the "Polaroid Sweet & Sour" look:
  const galleryProps = {
    items: galleryItems,
    rows: 1, // Changed to 1 row as requested
    bend: 4, // Subtle circular bend
    textColor: '#121212', // Dark text for readability on the white frame
    borderRadius: 0.05, // Slight rounding on the photo part inside the frame
    scrollSpeed: 2.5,
    scrollEase: 0.08
  };

  return (
    <GalleryPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <GalleryTitle>// SOUR & SWEET: CONTRA-SCROLL GALLERY // </GalleryTitle>
      
      <GalleryCanvasWrapper>
        {/* The CircularGallery takes 100% width/height of its parent */}
        <CircularGallery {...galleryProps} />
      </GalleryCanvasWrapper>

    </GalleryPageContainer>
  );
}