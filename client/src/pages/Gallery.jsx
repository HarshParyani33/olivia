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
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765412337/Vogue_croq6g.jpg', text: 'Sweet Memories' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415111/profile_xgrf5t.jpg', text: 'Road Trip Vibes' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415230/20241019_162402_onofll.jpg', text: 'Sour Face Era' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415238/IMG-20250128-WA0007_f9dazw.jpg', text: 'Late Night Talks' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415641/20240924_174140_0_mdah4g.jpg', text: 'Hello Kitty Mood' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415257/20241214_201437_thyrag.jpg', text: 'Good 4 U' }, 
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415404/20241123_125544_ycyt4y.jpg', text: 'Deja Vu Moment' }, 
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415397/Screenshot_20241107_034151_Video_Player_ee6o7k.jpg', text: 'Fave Hoodie' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415396/IMG-20241019-WA0048_h0lfsn.jpg', text: 'Driving License' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415254/20241214_201446_ytywft.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415730/IMG-20240624-WA0054_zsjuzf.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415867/IMG-20240321-WA0020_ohyfje.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415877/20240309_131127_il38f2.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415764/IMG-20240624-WA0050_nknujd.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415879/IMG_4316_dr0tic.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415872/Snapchat-1299315500_ismtdk.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415984/IMG_20240225_114245_651_uvphcr.jpg', text: 'Happier' },
  { image: 'https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765415986/IMG-20240225-WA0000_jvjlmt.jpg', text: 'Happier' },
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
      <GalleryTitle>// SOUR & SWEET: GALLERY // </GalleryTitle>
      
      <GalleryCanvasWrapper>
        {/* The CircularGallery takes 100% width/height of its parent */}
        <CircularGallery {...galleryProps} />
      </GalleryCanvasWrapper>

    </GalleryPageContainer>
  );
}