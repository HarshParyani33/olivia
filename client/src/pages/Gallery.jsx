// harshparyani33/olivia/olivia-7013c4ce5604752b19ff59b41552b31f1d191587/client/src/pages/Gallery.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Import the new OGL-based component
import CircularGallery from '../components/CircularGallery'; 

// --- DATA: Adapted from old Gallery.jsx data format ---
// NOTE: Use relative paths for images, and ensure they are placed in your public folder
const galleryItems = [
  { image: '/images/polaroid-1.jpg', text: 'Sweet Memories' },
  { image: '/images/polaroid-2.jpg', text: 'Road Trip Vibes' },
  { image: '/images/polaroid-3.jpg', text: 'Sour Face Era' },
  { image: '/images/polaroid-4.jpg', text: 'Late Night Talks' },
  { image: '/images/polaroid-5.jpg', text: 'Hello Kitty Mood' },
  { image: '/images/polaroid-6.jpg', text: 'Good 4 U' }, // Placeholder for more content
  { image: '/images/polaroid-7.jpg', text: 'Deja Vu Moment' }, // Placeholder for more content
  { image: '/images/polaroid-8.jpg', text: 'Fave Hoodie' }, // Placeholder for more content
  // IMPORTANT: For seamless loop/contra-scroll effect, use at least 8-10 items.
  // Add more of her photos here!
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
  z-index: 10; /* Ensure title is above the canvas */
`;

const GalleryCanvasWrapper = styled.div`
  /* CRUCIAL: The canvas needs a defined height relative to the container. */
  width: 100%;
  /* Takes up the remaining vertical space for the canvas to render */
  height: calc(100vh - 150px); 
  position: relative; 
`;


// --- REACT COMPONENT ---
export default function Gallery() {

  // Configuration for the "Polaroid Sweet & Sour" look:
  const galleryProps = {
    items: galleryItems,
    rows: 2, // ⬅️ Sets the requested 3-row layout
    bend: 4, // Subtle circular bend (higher value = flatter curve)
    textColor: '#545050', // Dark text for the white polaroid frame
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