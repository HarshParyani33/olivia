import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION ---
// This data would come from your MongoDB/Express backend via API call later.
const videoData = [
  { id: 1, title: "Pilot Episode: The Arrival", friend: "Bestie A", thumbnail: "/images/ep1.jpg", duration: "2:15" },
  { id: 2, title: "Season 1, Ep 2: Sour Prom", friend: "Friend B", thumbnail: "/images/ep2.jpg", duration: "1:45" },
  { id: 3, title: "The Next Era: The Tribute", friend: "Mom/Family", thumbnail: "/images/ep3.jpg", duration: "3:01" },
  // Add more video objects here
];

// --- STYLED COMPONENTS ---

const PageContainer = styled(motion.div)`
  /* Content is already wrapped by Layout, just need internal structure */
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
  overflow-x: scroll; /* Enable horizontal scrolling like Netflix */
  padding-bottom: 20px;

  /* Hide standard scrollbar for cleaner look */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const EpisodeCard = styled(motion.div)`
  flex-shrink: 0;
  width: 300px; /* Standard Netflix card width */
  height: 170px; /* 16:9 aspect ratio */
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
  background: url(${props => props.$thumbnail}) no-repeat center center;
  background-size: cover;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s;

  &:hover {
    transform: scale(1.05); /* Zoom effect on hover */
    z-index: 10;
    box-shadow: 0 8px 25px var(--color-accent); /* Pink glow */
  }

  /* MOBILE: Smaller card size for dense rows */
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
  
  /* Initially hidden, only shown on hover */
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


// --- REACT COMPONENT ---
export default function TheImpact() {

  // Function to handle clicking an episode (later, this will launch the video player modal)
  const handleEpisodeClick = (id) => {
    console.log(`Playing episode ${id}`);
    alert(`Playing Video Tribute ${id}`); // Placeholder action
  };

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
            onClick={() => handleEpisodeClick(video.id)}
            whileTap={{ scale: 0.98 }}
            layout // Enables Framer Motion's layout animations (if you reorder/filter later)
          >
            <EpisodeOverlay>
              <CardTitle>{video.title}</CardTitle>
              <CardFriend>From: {video.friend} ({video.duration})</CardFriend>
            </EpisodeOverlay>
          </EpisodeCard>
        ))}
        
        {/* Add a placeholder card to show how more content could be added */}
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
      
    </PageContainer>
  );
}