// client/src/pages/Timeline.jsx

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION ---
const timelineTracks = [
  { year: '2016', title: 'Track 1: Beginning of the Era', story: "The year the story really began. New city, new vibes.", song: '/music/track1.mp3', rotation: 0 },
  { year: '2018', title: 'Track 2: First Big Win', story: "A major accomplishment that set the bar high.", song: '/music/track2.mp3', rotation: 45 },
  { year: '2020', title: 'Track 3: The Golden Age', story: "The best summer/period, full of joy and sunshine.", song: '/music/track3.mp3', rotation: 90 },
  { year: '2022', title: 'Track 4: Late Night Talks', story: "The era of deep friendships and emotional growth.", song: '/music/track4.mp3', rotation: 135 },
  { year: '2024', title: 'Track 5: Sour to Sweet', story: "Overcoming challenges and finding inner peace.", song: '/music/track5.mp3', rotation: 180 },
  { year: '2025', title: 'Bonus Track: Here and Now', story: "Celebrating the amazing person you are today!", song: '/music/track6.mp3', rotation: 270 },
];

// --- KEYFRAMES ---
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- NEW STYLED COMPONENTS FOR MODAL ---
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const MessageCard = styled(motion.div)`
  background: #fff0f5; /* Off-white paper color */
  color: var(--color-background);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 0 50px var(--color-accent);
  max-width: 500px;
  width: 90%;
  font-family: var(--font-secondary);
  position: relative;
  text-align: center;
  border: 4px dashed var(--color-accent); 
`;

const ModalContent = styled.p`
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const CloseButton = styled(motion.button)`
  margin-top: 25px;
  padding: 10px 20px;
  background-color: var(--color-background);
  color: var(--color-accent);
  border: 3px solid var(--color-accent);
  font-family: var(--font-primary);
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
`;

// --- NEW STYLED COMPONENT FOR SUBTLE NOTIFICATION ---
const NotificationMessage = styled(motion.p)`
    position: absolute;
    top: -30px; /* Position above the buttons */
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    padding: 5px 10px;
    background-color: var(--color-accent);
    color: var(--color-background);
    border-radius: 5px;
    font-family: var(--font-primary);
    font-weight: bold;
    font-size: 0.9rem;
    box-shadow: 0 0 10px rgba(255, 51, 102, 0.8);
`;

// --- STYLED COMPONENTS (Existing) ---

const TimelineContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  min-height: calc(100vh - 100px);
  gap: 50px;
  flex-wrap: wrap;
`;

const ChartTitle = styled.h2`
  font-family: var(--font-primary);
  font-size: 2.5rem;
  color: var(--color-accent);
  margin-bottom: 20px;
  text-align: center;
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
  flex-direction: column; /* Allow content to stack */
  justify-content: center;
  align-items: center;
  font-family: var(--font-primary);
  font-weight: 900;
  font-size: 1rem;
  color: var(--color-background);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  cursor: pointer; /* Make it clickable */
  
  /* Keep the text static while the vinyl spins */
  animation: ${spin} 15s infinite linear reverse;
`;

const CenterText = styled.p`
  margin: 0;
  pointer-events: none; /* Allows click to pass through to the CenterLabel div */
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

const TrackButtonsWrapper = styled.div`
    position: relative; /* Needed to position the NotificationMessage */
    margin-bottom: 20px; 
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
  const [showModal, setShowModal] = useState(false);
  const [notification, setNotification] = useState(null); // NEW State for non-blocking message

  // Function to handle track selection and play indicator
  const handleTrackSelect = (track) => {
      // 1. Set the active track
      setActiveTrack(track);
      
      // 2. Set the notification message
      setNotification(`▶️ Playing: ${track.title}`);
      
      // 3. Clear the notification after 2 seconds
      setTimeout(() => {
          setNotification(null);
      }, 2000);
      
      // NOTE: Actual audio playback logic would go here:
      // const audio = new Audio(track.song);
      // audio.play();
  };

  const handleCenterClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Framer Motion variant for the milestone text container
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // The custom message for the center vinyl click
  const vinylMessage = "Every track here marks a milestone, but the track of your life is my favorite album. Keep spinning, superstar!";

  return (
    <TimelineContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <VinylWrapper>
        <Vinyl />
        <CenterLabel
            onClick={handleCenterClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <CenterText>{activeTrack.year}</CenterText>
            <CenterText style={{ fontSize: '0.7rem' }}>Click!</CenterText>
        </CenterLabel>
      </VinylWrapper>
      
      <MilestoneList>
        <ChartTitle>//DISCOGRAPHY// </ChartTitle>
        <TrackButtonsWrapper>
            {/* Display the subtle notification if it exists */}
            {notification && (
                <NotificationMessage
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    {notification}
                </NotificationMessage>
            )}
            
            {timelineTracks.map(track => (
              <TrackButton
                key={track.year}
                $active={activeTrack.year === track.year}
                onClick={() => handleTrackSelect(track)} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {`Track ${timelineTracks.indexOf(track) + 1}`}
              </TrackButton>
            ))}
        </TrackButtonsWrapper>
        
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
      
      {/* Message Modal */}
      {showModal && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <MessageCard
            onClick={(e) => e.stopPropagation()} 
            initial={{ scale: 0.5, rotate: 5 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ChartTitle>MESSAGE FROM THE PRODUCER</ChartTitle>
            <ModalContent>{vinylMessage}</ModalContent>
            <CloseButton 
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
              CLOSE NOTE
            </CloseButton>
          </MessageCard>
        </ModalOverlay>
      )}
    </TimelineContainer>
  );
}