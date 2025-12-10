import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION ---
const vanityItems = [
  { 
    id: 1, 
    type: 'Mirror', 
    content: "Hello Kitty Mirror",
    note: "You are the fairest of them all—and the strongest.",
    initialX: -150, 
    initialY: -100,
    size: 'large',
    rotation: -5
  },
  { 
    id: 2, 
    type: 'Lipstick', 
    content: "Hot Pink Lipstick",
    note: "Wear this shade whenever you need a confidence boost.",
    initialX: 100, 
    initialY: 50,
    size: 'small',
    rotation: 15
  },
  { 
    id: 3, 
    type: 'Diary', 
    content: "Burn Book (empty)",
    note: "This page is reserved only for the sweetest memories.",
    initialX: 200, 
    initialY: -150,
    size: 'medium',
    rotation: 0
  },
  { 
    id: 4, 
    type: 'Charm', 
    content: "Silver Star Charm",
    note: "A reminder of your dazzling, superstar potential.",
    initialX: -200, 
    initialY: 100,
    size: 'small',
    rotation: 10
  },
];

// --- STYLED COMPONENTS ---

const LockerContainer = styled(motion.div)`
  min-height: calc(100vh - 100px);
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 50px;
  font-family: var(--font-primary);
  text-align: center;
`;

const Desk = styled.div`
  width: 90%;
  height: 600px;
  max-width: 1200px;
  background-color: #6a6a6a; /* Gray/Wood effect for the desk */
  border-radius: 10px;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.7);
  position: relative;
  overflow: hidden;
`;

const DraggableItem = styled(motion.div)`
  position: absolute;
  cursor: grab;
  touch-action: none; 
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: var(--font-secondary);
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  z-index: 20;

  /* Size variations */
  ${props => props.$size === 'large' && `
    width: 250px;
    height: 300px;
    background-color: #fce4ec; /* Light pink background */
    color: var(--color-accent);
    border: 3px dashed var(--color-accent);
  `}
  ${props => props.$size === 'medium' && `
    width: 180px;
    height: 200px;
    background-color: #f77f9e; /* Medium pink background */
    color: white;
    border: 2px solid white;
  `}
  ${props => props.$size === 'small' && `
    width: 100px;
    height: 100px;
    border-radius: 50%; /* Make small items circular */
    background-color: var(--color-accent);
    color: white;
    border: 2px solid #fff;
  `}
  
  &:active {
    cursor: grabbing;
  }
`;

const NoteOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 50;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NoteCard = styled(motion.div)`
  background: white;
  color: var(--color-background);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 40px var(--color-accent);
  max-width: 500px;
  text-align: center;
  font-family: var(--font-secondary);
  font-size: 1.5rem;
  line-height: 1.6;
  border: 5px solid var(--color-accent);
`;

const CloseButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: var(--color-accent);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-weight: bold;

  &:hover {
    background-color: #e6004c;
  }
`;

// --- REACT COMPONENT ---
export default function Locker() {
  const [activeNote, setActiveNote] = useState(null);

  const handleItemClick = (note) => {
    setActiveNote(note);
  };

  const handleCloseNote = () => {
    setActiveNote(null);
  };

  return (
    <LockerContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Title>// VANITY: DRAG-AND-DROP LOCKER // </Title>
      
      <Desk>
        {vanityItems.map((item) => (
          <DraggableItem
            key={item.id}
            $size={item.size}
            // Set initial position relative to the Desk container
            initial={{ 
              x: item.initialX, 
              y: item.initialY,
              rotate: item.rotation 
            }}
            
            // Enable dragging within the parent Desk bounds
            drag
            dragConstraints={{ top: -250, bottom: 250, left: -450, right: 450 }} 
            dragElastic={0.2}
            
            // Interaction: Open note on click/tap
            onClick={() => handleItemClick(item.note)}
            whileTap={{ 
                scale: 0.95, 
                boxShadow: `0 0 15px var(--color-accent)` 
            }}
          >
            {item.content}
          </DraggableItem>
        ))}
      </Desk>

      {/* Hidden Note Overlay */}
      {activeNote && (
        <NoteOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <NoteCard
            initial={{ scale: 0.5, rotate: 5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <p>{activeNote}</p>
            <CloseButton 
              onClick={handleCloseNote}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              CLOSE DIARY
            </CloseButton>
          </NoteCard>
        </NoteOverlay>
      )}
    </LockerContainer>
  );
}