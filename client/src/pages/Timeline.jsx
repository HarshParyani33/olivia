import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION ---
const timelineTracks = [
  { year: '2016', title: 'Track 1: Beginning of the Era', story: "The year the story really began. New city, new vibes.", rotation: 0 },
  { year: '2018', title: 'Track 2: First Big Win', story: "A major accomplishment that set the bar high.", rotation: 45 },
  { year: '2020', title: 'Track 3: The Golden Age', story: "The best summer/period, full of joy and sunshine.", rotation: 90 },
  { year: '2022', title: 'Track 4: Late Night Talks', story: "The era of deep friendships and emotional growth.", rotation: 135 },
  { year: '2024', title: 'Track 5: Sour to Sweet', story: "Overcoming challenges and finding inner peace.", rotation: 180 },
  { year: '2025', title: 'Bonus Track: Here and Now', story: "Celebrating the amazing person you are today!", rotation: 270 },
];

// --- KEYFRAMES ---
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- STYLED COMPONENTS ---

const TimelineContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  min-height: calc(100vh - 100px);
  gap: 50px;
  flex-wrap: wrap;
`;

const VinylWrapper = styled(motion.div)`
  position: relative;
  width: 450px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Vinyl = styled.div`
  width: 100%;
  height: 100%;
  background-color: #121212; /* Black vinyl */
  border-radius: 50%;
  border: 15px solid #282828; /* Darker edge */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  
  /* Apply the spin animation */
  animation: ${spin} 15s infinite linear;
`;

const CenterLabel = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: var(--color-accent); /* Hot Pink Label */
  border: 5px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-primary);
  font-weight: 900;
  font-size: 1rem;
  color: var(--color-background);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  
  /* Keep the text static while the vinyl spins */
  animation: ${spin} 15s infinite linear reverse;
`;

const MilestoneList = styled.div`
  max-width: 400px;
  padding: 20px;
`;

const MilestoneTitle = styled.h2`
  font-family: var(--font-primary);
  color: var(--color-accent);
  margin-bottom: 10px;
`;

const MilestoneText = styled.p`
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.5;
`;

const TrackButton = styled(motion.button)`
  margin: 8px;
  padding: 10px 15px;
  background-color: ${props => props.$active ? 'var(--color-accent)' : '#282828'};
  color: ${props => props.$active ? 'var(--color-background)' : 'white'};
  border: 1px solid ${props => props.$active ? 'var(--color-accent)' : '#444'};
  border-radius: 20px;
  cursor: pointer;
  font-family: var(--font-primary);
  font-size: 0.9rem;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    background-color: ${props => props.$active ? 'var(--color-accent)' : '#3d3d3d'};
  }
`;

// --- REACT COMPONENT ---
export default function Timeline() {
  const [activeTrack, setActiveTrack] = useState(timelineTracks[0]);

  // Framer Motion variant for the milestone text container
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <TimelineContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <VinylWrapper>
        <Vinyl />
        <CenterLabel>
            {activeTrack.year}
        </CenterLabel>
        
        {/* Need a component to represent the Tonearm later, but for now we focus on the record */}
      </VinylWrapper>
      
      <MilestoneList>
        <ChartTitle>// DISCOGRAPHY // </ChartTitle>
        <div style={{ marginBottom: '20px' }}>
          {timelineTracks.map(track => (
            <TrackButton
              key={track.year}
              $active={activeTrack.year === track.year}
              onClick={() => setActiveTrack(track)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {`Track ${timelineTracks.indexOf(track) + 1}`}
            </TrackButton>
          ))}
        </div>
        
        <motion.div
          key={activeTrack.year} // Use key to trigger re-animation on track change
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <MilestoneTitle>{activeTrack.title}</MilestoneTitle>
          <MilestoneText>{activeTrack.story}</MilestoneText>
        </motion.div>
      </MilestoneList>
    </TimelineContainer>
  );
}