// client/src/pages/TheImpact.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import VideoPlayer from '../components/VideoPlayer'; // NEW: Import VideoPlayer

// --- DATA SIMULATION (Ensure you fill these with your actual video URLs) ---
const videoData = [
  { 
    id: 1, 
    title: "Pilot Episode: The Bestie Era", 
    friend: "Pragati Tripathi", 
    thumbnail: "https://res.cloudinary.com/dd6a0rwbr/image/upload/v1765400987/Episode-1_canuyi.png", 
    duration: "4:23",
    videoUrl: "https://res.cloudinary.com/dd6a0rwbr/video/upload/v1765401781/VN20251211_024735_bi5zet.mp4" // 🚨 REPLACE THIS WITH YOUR VIDEO URL
  },
  { 
    id: 2, 
    title: "Season 1, Ep 2: Sour Prom", 
    friend: "Friend B", 
    thumbnail: "/images/ep2.jpg", 
    duration: "1:45",
    videoUrl: "YOUR_DIRECT_MP4_LINK_FOR_EP2" // 🚨 REPLACE THIS WITH YOUR VIDEO URL
  },
  { 
    id: 3, 
    title: "The Next Era: The Tribute", 
    friend: "Mom/Family", 
    thumbnail: "/images/ep3.jpg", 
    duration: "3:01", 
    videoUrl: "YOUR_DIRECT_MP4_LINK_FOR_EP3" // 🚨 REPLACE THIS WITH YOUR VIDEO URL
  },
  // Add more video objects here
];

// --- STYLED COMPONENTS (Updated Modal & Info Box) ---

// Modal Overlay - covers the whole screen
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  z-index: 50; 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

// Container for the VideoPlayer inside the modal
const VideoModalContainer = styled(motion.div)`
  width: 90%;
  max-width: 900px; 
  /* NEW/MODIFIED: Ensure the height is limited relative to the screen size */
  max-height: 90vh; /* Limit to 90% of viewport height */
  
  background: var(--color-background);
  box-shadow: 0 0 50px var(--color-accent);
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--color-accent);
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 60; 
  opacity: 0.8;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

// NEW: Info box to show episode details inside the modal
const EpisodeInfoBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15px 30px;
  /* Use a strong gradient to ensure text is visible over the video */
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  z-index: 55; 
  pointer-events: none; /* Allows clicks to pass through to the video controls */
`;

const ModalEpisodeTitle = styled.h3`
    font-size: 1.5rem;
    color: white;
    font-family: var(--font-primary);
    margin: 0;
`;

const ModalEpisodeSubtitle = styled.p`
    font-size: 1rem;
    color: var(--color-accent);
    margin-top: 5px;
`;

// --- EXISTING STYLED COMPONENTS (For Episode Cards) ---

const PageContainer = styled(motion.div)`
  padding: 40px 0;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: var(--color-text);
  margin-bottom: 20px;
  font-family: var(--font-primary);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EpisodesRow = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: scroll;
  padding-bottom: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const EpisodeCard = styled(motion.div)`
  flex-shrink: 0;
  width: 300px;
  height: 170px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  background: url(${props => props.$thumbnail}) no-repeat center center;
  background-size: cover;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05);
    z-index: 10;
    box-shadow: 0 8px 25px var(--color-accent);
  }

  @media (max-width: 500px) {
    width: 250px;
    height: 140px;
  }
`;

const EpisodeOverlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  opacity: 0;
  transition: opacity 0.3s;
  
  ${EpisodeCard}:hover & {
    opacity: 1;
  }
`;

const CardTitle = styled.p`
  font-weight: bold;
  font-size: 1rem;
  color: white;
  margin-bottom: 3px;

  @media (max-width: 500px) {
    font-size: 0.9rem;
  }
`;

const CardFriend = styled.small`
  color: var(--color-accent);
  font-family: var(--font-secondary);
`;

const VideoWrapper = styled.div`
  /* Standard cinematic aspect ratio (16:9). Puts the video in a box */
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio (9/16 * 100) */
  
  /* Ensure the VideoPlayer is positioned absolutely inside this wrapper */
  & > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;


// --- REACT COMPONENT ---
export default function TheImpact() {
  const [selectedEpisode, setSelectedEpisode] = useState(null); 

  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode); 
  };

  const handleCloseModal = () => {
    setSelectedEpisode(null);
  }

  return (
    <PageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
    >
      <SectionTitle>// THE IMPACT: FRIENDSHIP ERA // </SectionTitle>
      
      <EpisodesRow>
        {videoData.map((video) => (
          <EpisodeCard
            key={video.id}
            $thumbnail={video.thumbnail}
            onClick={() => handleEpisodeClick(video)} 
            whileTap={{ scale: 0.98 }}
            layout
          >
            <EpisodeOverlay>
              <CardTitle>{video.title}</CardTitle>
              <CardFriend>From: {video.friend} ({video.duration})</CardFriend>
            </EpisodeOverlay>
          </EpisodeCard>
        ))}
        
        {/* Placeholder card */}
        <EpisodeCard
            $thumbnail={"/images/placeholder.jpg"}
            style={{ 
              backgroundColor: '#333', 
              backgroundImage: 'none',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
        >
            <CardTitle>More Coming Soon...</CardTitle>
        </EpisodeCard>
        
      </EpisodesRow>

      {/* Conditional Video Modal Rendering */}
      {selectedEpisode && (
        <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal} 
        >
            <VideoModalContainer
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                onClick={(e) => e.stopPropagation()} 
            >
                {/* 1. Video Player is wrapped in the new VideoWrapper */}
                <VideoWrapper>
                    <VideoPlayer
                        src={selectedEpisode.videoUrl}
                        title={selectedEpisode.title} 
                        controls={true}
                        autoPlay={true}
                        muted={false} 
                    />
                </VideoWrapper>
                
                {/* 2. Episode Info Box (Title in the bottom left) */}
                <EpisodeInfoBox>
                    <ModalEpisodeTitle>{selectedEpisode.title}</ModalEpisodeTitle>
                    <ModalEpisodeSubtitle>
                        {selectedEpisode.friend} | Duration: {selectedEpisode.duration}
                    </ModalEpisodeSubtitle>
                </EpisodeInfoBox>

                {/* 3. Close Button */}
                <CloseButton onClick={handleCloseModal}>X</CloseButton>
            </VideoModalContainer>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}