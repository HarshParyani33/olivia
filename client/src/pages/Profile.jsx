import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION ---
const profileData = {
  stageName: "Protocol Olivia",
  era: "The Eternal Sophomore",
  birthDate: "Sept 12",
  position: "Vocalist, Visual, Main Character",
  favoriteTrack: "Driver's License (Remix)",
  photo: "/images/profile-hero.jpg", // Placeholder photo
  stats: {
    Cuteness: 99,
    Sass: 95,
    Dancing: 60,
    Melodrama: 90,
    Songwriting: 75,
  },
};

// --- STYLED COMPONENTS (Unchanged IdolCard/Detail Section) ---

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
    width: 90vw;
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

// --- NEW PIE CHART COMPONENTS & LOGIC ---

const ChartTitle = styled.h2`
  font-family: var(--font-primary);
  font-size: 1.8rem;
  color: var(--color-text);
  margin-bottom: 30px; /* Increased margin for separation */
  width: 100%;
  text-align: center;
`;

const PieChartWrapper = styled(motion.div)`
  width: 300px;
  height: 300px;
  position: relative;
  flex-shrink: 0;
  box-shadow: 0 0 30px rgba(255, 45, 45, 0.4);
  border-radius: 50%;
  
  /* Container for the chart and the legend to sit side-by-side */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PieChart = styled.div.attrs(props => ({
  $gradient: props.$gradient,
}))`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.$gradient};
  border: 4px solid var(--color-accent);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
`;

const LegendList = styled.ul`
    list-style: none;
    padding: 0;
    margin-left: 30px;
    max-width: 300px;
    
    /* Removed card background and border */
    background: transparent;
    padding: 15px 0;
    border-radius: 0;
    box-shadow: none;

    @media (max-width: 1024px) {
        margin-top: 20px;
        margin-left: 0;
        max-width: 350px;
        padding: 15px; /* Added slight padding for mobile visibility */
    }
`;

const LegendItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between; /* Space out stat name and percentage */
    padding: 8px 0;
    font-family: var(--font-primary);
    font-size: 1.1rem;
    color: var(--color-text); 
    
    /* Ensure only the list item is highlighted */
    &:before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${props => props.$color};
        margin-right: 10px;
        box-shadow: 0 0 5px ${props => props.$color};
    }

    /* Styling the percentage part (span) */
    span {
      font-weight: 900;
      color: var(--color-accent); /* Highlight the percentage */
      font-family: var(--font-primary);
    }
`;


// Helper to assign a color to each stat
const statColors = {
    Cuteness: '#ff3366', // Hot Pink (Accent)
    Sass: '#ff69b4',     // Medium Pink
    Dancing: '#8a2be2',  // Blue Violet
    Melodrama: '#ffd700', // Gold
    Songwriting: '#00ffff', // Cyan (A contrasting color)
};

// Function to calculate the conic gradient string for the pie chart
function calculateConicGradient(stats) {
    const values = Object.values(stats);
    // Use Math.max(1, total) to prevent division by zero if all stats are 0
    const total = Math.max(1, values.reduce((sum, val) => sum + val, 0));
    
    let gradient = 'conic-gradient(from 0deg';
    let currentDegree = 0;

    Object.keys(stats).forEach((key) => {
        const value = stats[key];
        // Calculate slice size in degrees (value / total * 360)
        const degrees = (value / total) * 360;
        const color = statColors[key];
        const nextDegree = currentDegree + degrees;
        
        // Add the segment: e.g., #ff3366 0deg 20deg
        gradient += `, ${color} ${currentDegree.toFixed(2)}deg ${nextDegree.toFixed(2)}deg`;
        
        currentDegree = nextDegree;
    });

    gradient += ')';
    return gradient;
}


// --- REACT COMPONENT ---
export default function Profile() {
  
  // 1. Calculate the total value (overall value)
  const totalValue = Object.values(profileData.stats).reduce((sum, value) => sum + value, 0);

  // Calculate gradient string
  const gradientString = calculateConicGradient(profileData.stats);
  
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

      {/* Pie Chart and Stats */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ChartTitle>Main Character Stats</ChartTitle>
        <div style={{ display: 'flex', alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'center' }}>
            <PieChartWrapper
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            >
              {/* Pie Chart using Conic Gradient */}
              <PieChart $gradient={gradientString} /> 
            </PieChartWrapper>
            
            {/* Legend List */}
            <LegendList>
                {Object.entries(profileData.stats).map(([key, value]) => {
                    // Calculate the real percentage: (value / overall_value) * 100
                    const percentage = totalValue > 0 ? (value / totalValue) * 100 : 0;

                    return (
                        <LegendItem key={key} $color={statColors[key]}>
                            <span>{key}:</span> 
                            {/* Display the calculated percentage rounded to one decimal place, as requested */}
                            <span>{percentage.toFixed(1)}%</span>
                        </LegendItem>
                    );
                })}
            </LegendList>
        </div>
      </div>
    </ProfileContainer>
  );
}