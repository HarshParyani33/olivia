import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// NOTE: For the Radar Chart, you would typically use a library like 
// 'react-chartjs-2' or 'recharts'. We are simulating the visual.

// --- DATA SIMULATION ---
const profileData = {
  stageName: "Protocol Olivia",
  era: "The Eternal Sophomore",
  birthDate: "Sept 12",
  position: "Vocalist, Visual, Main Character",
  favoriteTrack: "Driver's License (Remix)",
  photo: "/images/profile-hero.jpg", // Placeholder photo
  stats: {
    Cuteness: 85,
    Sass: 95,
    Dancing: 60,
    Melodrama: 90,
    Songwriting: 75,
  },
};

// --- STYLED COMPONENTS ---

const ProfileContainer = styled(motion.div)`
  padding: 50px 0;
  min-height: calc(100vh - 100px); 
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 50px;

  @media (max-width: 1024px) {
    flex-direction: column; /* Stack content vertically */
    align-items: center;
    gap: 30px;
  }
`;

const IdolCard = styled.div`
  width: 350px;
  background-color: #1e1e1e; /* Slightly lighter black for depth */
  border: 2px solid var(--color-accent);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 0 30px rgba(255, 51, 102, 0.4);

  @media (max-width: 480px) {
    width: 90vw; /* Take up 90% of viewport width */
  }
`;

const ProfilePhoto = styled.div`
  width: 100%;
  height: 350px;
  background: url(${props => props.$photo}) no-repeat center center;
  background-size: cover;
  border-bottom: 2px solid var(--color-accent);
`;

const InfoBox = styled.div`
  padding: 25px;
`;

const Detail = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: var(--color-text);

  strong {
    color: var(--color-accent);
    font-family: var(--font-primary);
  }
`;

const Title = styled.h1`
  font-family: var(--font-primary);
  font-size: 2.5rem;
  color: var(--color-accent);
  text-align: center;
  margin-bottom: 20px;
`;

/* --- RADAR CHART COMPONENTS --- */
const ChartTitle = styled.h2`
  font-family: var(--font-primary);
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 51, 102, 0.3);
  padding-bottom: 10px;
  width: 100%;
  text-align: center;
`;

const RadarChartWrapper = styled(motion.div)`
  width: 400px;
  height: 400px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; /* 👈 Anchor for StatsOverlay */
`;

const RadarPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  /* Creates the pink fill effect */
  background: conic-gradient(
    var(--color-accent) 0%,
    var(--color-accent) 50%,
    transparent 50%
  );
  border: 1px dashed rgba(255, 255, 255, 0.3);
  
  /* Removed rotation animation to fix illegibility */
`;

const StatsOverlay = styled.div`
    position: absolute; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none; /* Allows mouse events to pass through */
`;

const StatList = styled.ul`
  list-style: none;
  padding: 0;
  width: 250px; /* Constrain list width for clarity */
  background: rgba(18, 18, 18, 0.8); /* Semi-transparent background for readability */
  padding: 15px;
  border-radius: 8px;
  pointer-events: all; /* Restore pointer events for the list items */
`;

const StatItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-family: var(--font-secondary); /* Use secondary font for unique style */
  font-size: 1.1rem;
  border-bottom: 1px dotted #333;

  span {
    color: var(--color-accent);
    font-weight: bold;
  }
`;

// --- REACT COMPONENT ---
export default function Profile() {
  return (
    <ProfileContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      
      {/* K-Pop Idol Card */}
      <IdolCard>
        <ProfilePhoto $photo={profileData.photo} />
        <InfoBox>
          <Title>{profileData.stageName}</Title>
          <Detail>
            Stage Name: <strong>{profileData.stageName}</strong>
          </Detail>
          <Detail>
            Current Era: <strong>{profileData.era}</strong>
          </Detail>
          <Detail>
            Debut Date: <strong>{profileData.birthDate}</strong>
          </Detail>
          <Detail>
            Position: <strong>{profileData.position}</strong>
          </Detail>
          <Detail>
            Favorite Track: <strong>{profileData.favoriteTrack}</strong>
          </Detail>
        </InfoBox>
      </IdolCard>

      {/* Radar Chart and Stats */}
      <RadarChartWrapper
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
      >
        <ChartTitle>Main Character Stats</ChartTitle>
        
        {/* The visual effect, no rotation */}
        <RadarPlaceholder /> 
        
        {/* The readable stats list on top */}
        <StatsOverlay>
            <StatList>
                {Object.entries(profileData.stats).map(([key, value]) => (
                    <StatItem key={key}>
                        {key}: <span>{value}%</span>
                    </StatItem>
                ))}
            </StatList>
        </StatsOverlay>

      </RadarChartWrapper>
    </ProfileContainer>
  );
}