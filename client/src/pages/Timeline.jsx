// client/src/pages/Timeline.jsx

import React, { useState, useRef, useEffect } from 'react'; // UPDATED: Added useRef, useEffect
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION (UPDATED with unique vinylMessages) ---
const timelineTracks = [
  { 
    year: '2003', 
    title: 'Track 1: Beginning of the Era', 
    story: "The year the story really began. The birth of the superstar.", 
    // Cloudinary URL - REPLACE THIS FOR TRACKS 2-6
    song: 'https://res.cloudinary.com/dd6a0rwbr/video/upload/v1765394973/Finding_Her_Kushagra_128_Kbps_kqgsom.mp3', 
    rotation: 0,
    vinylMessage: "2003: The year the needle dropped on the rest of your life. This track is all about discovering the rhythm. You may not realize it yet, but your presence lights up every room. Keep shining! I am so glad you were born and we get to share this journey together." 
  },
  { 
    year: '2013', 
    title: 'Track 2: Years that shaped me', 
    story: "The transformative years filled with growth and self-discovery.", 
    song: 'https://res.cloudinary.com/dd6a0rwbr/video/upload/v1765413199/Lamhey__Anubha_Bajaj_Trending_Song_2023_Official_Video_wamco8.mp3', 
    rotation: 45,
    vinylMessage: "2013: Growth is messy. This record holds the sound of overcoming obstacles and proving your worth. Remember, every challenge you faced only made you stronger and more radiant. Keep believing in your magic! These are the years that defined your sparkle that define you and your inner strength today. Always remember that." 
  },
  { 
    year: '2018', 
    title: 'Track 3: The Preparation', 
    story: "The build-up to something amazing.", 
    song: 'https://res.cloudinary.com/dd6a0rwbr/video/upload/v1765413400/Kho_Gaye_Hum_Kahan_-Full_Video_Baar_Baar_Dekho_Sidharth_Malhotra_Katrina_K_Jasleen_R_Prateek_K_tzna7f.mp3', 
    rotation: 90,
    vinylMessage: "2018: Sunshine and high energy. These were the year of preparation, preparation to step in the real world. Keep those lessons life taught you close to your heart as you continue to chase your dreams. You are destined for greatness! You are never gonna be alone ever again!" 
  },
  { 
    year: '2023', 
    title: 'Track 4: The New Life', 
    story: "The era of new beginnings and fresh starts.", 
    song: 'https://res.cloudinary.com/dd6a0rwbr/video/upload/v1765414057/Prateek_Kuhad_-_Kasoor_Official_Music_Video_dzvemn.mp3', 
    rotation: 135,
    vinylMessage: "2023: A year of new beginnings. This track celebrates your courage to embrace change and start a new college journey. Remember, every ending is just a new beginning in disguise. Keep moving forward with confidence and grace! If you can handle living in a place where you know no one, you can handle anything life throws at you. The phase where you made strangers your best friends and much more. The phase that made your inner personality come through!" 
  },
  { 
    year: '2024', 
    title: 'Track 5: The Golden Age', 
    story: "The era of deep friendships and emotional growth.", 
    song: 'https://res.cloudinary.com/dd6a0rwbr/video/upload/v1765414485/Maroon_5_-_Memories_Official_Video_wdrfo7.mp3', 
    rotation: 180,
    vinylMessage: "2024: The golden age of friendships. This track is a tribute to the incredible friends you've made and the unforgettable memories you've created together. Cherish these bonds, for they are the true treasures of life. Keep nurturing these relationships and let your heart lead the way! This era is all about finding your tribe and loving them hard. The friends who became family and made every moment unforgettable." 
  },
  { 
    year: '2025', 
    title: 'Bonus Track: Here and Now', 
    story: "Overcoming challenges and finding inner peace.", 
    song: 'https://res.cloudinary.com/dd6a0rwbr/video/upload/v1765414715/Kahaani_j5qhgj.mp3', 
    rotation: 270,
    // FINAL CATCH-ALL MESSAGE: A personal one from the producer (you!)
    vinylMessage: "Every track here marks a milestone, but the track of your life is my favorite album. Keep spinning, superstar! This is the era you have to shine in front of this world and show them what you are made of. You are unstoppable, unbreakable, and undeniably you. Keep being the incredible person you are, and never forget how much you are loved by your family,me and your always and forever." 
  },
];

// --- KEYFRAMES ---
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// --- NEW/MODIFIED STYLED COMPONENTS ---

// Audio Player: HIDDEN to prevent showing the default controls
const AudioPlayer = styled.audio`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  margin: 0;
`;

// Modal Overlay (Unchanged)
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

// Message Card (Unchanged)
const MessageCard = styled(motion.div)`
  background: #fff0f5; 
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

// Notification (Unchanged)
const NotificationMessage = styled(motion.p)`
    position: absolute;
    top: -30px; 
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

// --- EXISTING STYLED COMPONENTS (Vinyl/Layout) ---

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
    position: relative; 
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
  const [notification, setNotification] = useState(null); 
  
  const audioRef = useRef(null); 

  // Function to handle track selection and play indicator
  const handleTrackSelect = (track) => {
      // 1. Stop and reset the current track
      if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0; // Reset to start
      }
      
      // 2. Set the active track
      setActiveTrack(track);
      
      // 3. Set the notification message
      setNotification(`▶️ Playing: ${track.title}`);
      
      // 4. Clear the notification after 2 seconds
      setTimeout(() => {
          setNotification(null);
      }, 2000);
  };
  
  // Effect hook to handle playback whenever activeTrack changes
  useEffect(() => {
    if (activeTrack && activeTrack.song) {
        const timer = setTimeout(() => {
             if (audioRef.current) {
                 audioRef.current.play().catch(error => {
                     // Catch the common Autoplay Policy error (user interaction required)
                     console.warn("Autoplay was prevented.", error);
                     setNotification(`⚠️ Autoplay blocked. Please click anywhere on the page to enable sound.`);
                 });
             }
        }, 100); 
        
        return () => clearTimeout(timer); 
    }
  }, [activeTrack]);

  const handleCenterClick = () => {
    // Only show the message if a track is actively selected
    if (activeTrack.vinylMessage) { 
        setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
            {/* Notification message */}
            {notification && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <NotificationMessage>
                        {notification}
                    </NotificationMessage>
                </motion.div>
            )}
            
            {/* Track Buttons */}
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
          key={activeTrack.year} 
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <MilestoneTitle>{activeTrack.title}</MilestoneTitle>
          <MilestoneText>{activeTrack.story}</MilestoneText>
        </motion.div>

        {/* HIDDEN Audio Player element */}
        {activeTrack.song && (
            <AudioPlayer 
                ref={audioRef} 
                key={activeTrack.song}
                autoPlay={false} 
            >
                <source src={activeTrack.song} type="audio/mpeg" />
                Your browser does not support the audio element.
            </AudioPlayer>
        )}

      </MilestoneList>
      
      {/* Message Modal (MODIFIED) */}
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
            {/* MODIFIED: Title dynamically changes based on the active year */}
            <ChartTitle>MESSAGE FROM THE {activeTrack.year} ERA</ChartTitle>
            {/* MODIFIED: Content uses the unique vinylMessage */}
            <ModalContent>{activeTrack.vinylMessage}</ModalContent>
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