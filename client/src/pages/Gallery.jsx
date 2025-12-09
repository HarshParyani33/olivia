import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION ---
// We'll use random initial positions and rotations
const galleryPhotos = [
  { id: 1, src: '/images/polaroid-1.jpg', caption: 'Sweet Memories', initialRotation: 10, initialX: 50, initialY: 0 },
  { id: 2, src: '/images/polaroid-2.jpg', caption: 'Road Trip Vibes', initialRotation: -15, initialX: 200, initialY: -50 },
  { id: 3, src: '/images/polaroid-3.jpg', caption: 'Sour Face Era', initialRotation: 5, initialX: -100, initialY: 150 },
  { id: 4, src: '/images/polaroid-4.jpg', caption: 'Late Night Talks', initialRotation: -5, initialX: -250, initialY: 50 },
  { id: 5, src: '/images/polaroid-5.jpg', caption: 'Hello Kitty Mood', initialRotation: 18, initialX: 10, initialY: 250 },
];

// --- STYLED COMPONENTS ---

const GalleryContainer = styled(motion.div)`
  /* Full height is handled by Layout, just need internal padding */
  min-height: 100vh;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GalleryTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 50px;
  font-family: var(--font-primary);
  text-align: center;
`;

const PhotoBoard = styled.div`
  width: 90%;
  height: 600px;
  max-width: 1200px;
  background-color: #333333; /* Dark table/board surface */
  border-radius: 10px;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
  position: relative; 
  margin-bottom: 50px;
  /* Allow space for polaroids to scatter beyond edges slightly */
  overflow: visible; 
`;

const Polaroid = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 300px;
  background-color: #f0f0f0; /* White polaroid frame */
  padding: 10px 10px 40px 10px; 
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  cursor: grab;
  touch-action: none; 
  z-index: 10; 
  border-radius: 2px;
  
  /* Initial offset positioning to simulate scatter */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PolaroidImage = styled.div`
  width: 100%;
  height: 100%;
  background: url(${props => props.$src}) no-repeat center center;
  background-size: cover;
  border: 1px solid #121212;
`;

const PolaroidCaption = styled.p`
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
  text-align: center;
  font-family: var(--font-secondary); /* Handwritten look */
  color: var(--color-background);
  font-size: 1.1rem;
`;

// --- REACT COMPONENT ---
export default function Gallery() {

  return (
    <GalleryContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <GalleryTitle>// SOUR & SWEET: PHOTO GALLERY // </GalleryTitle>
      
      <PhotoBoard>
        {/* We use the PhotoBoard as the dragConstraints for the polaroids */}
        {galleryPhotos.map((photo) => (
          <Polaroid
            key={photo.id}
            
            // 1. Initial position and rotation (Scattered look)
            initial={{ 
                // x and y offsets from the center of the PhotoBoard
                x: `calc(-50% + ${photo.initialX}px)`, 
                y: `calc(-50% + ${photo.initialY}px)`, 
                rotate: photo.initialRotation,
                opacity: 0,
                scale: 0.8
            }}
            
            // 2. Animate to view (Enter effect)
            animate={{ opacity: 1, scale: 1, x: `calc(-50% + ${photo.initialX}px)`, y: `calc(-50% + ${photo.initialY}px)` }}
            transition={{ type: "spring", stiffness: 50, delay: 0.5 + photo.id * 0.1 }}

            // 3. Enable Dragging constrained to the parent PhotoBoard
            drag
            dragConstraints={{ top: -300, bottom: 300, left: -400, right: 400 }} /* Adjust constraints for a natural feel */
            dragElastic={0.5} 
            
            // 4. Hover Effect (The "Straighten" effect)
            whileHover={{ 
              rotate: 0,            /* Straighten on hover */
              scale: 1.1,           /* Pop out */
              zIndex: 50,           /* Bring to front */
              boxShadow: "0 15px 30px rgba(255, 51, 102, 0.8)" /* Strong pink glow */
            }}
          >
            <PolaroidImage $src={photo.src} />
            <PolaroidCaption>{photo.caption}</PolaroidCaption>
          </Polaroid>
        ))}
      </PhotoBoard>

    </GalleryContainer>
  );
}