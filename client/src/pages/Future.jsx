import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

// --- DATA SIMULATION (Goals for the upcoming year) ---
const newSeasonGoals = [
  "Mastering a challenging new skill (Level Up!).",
  "Traveling somewhere completely unexpected.",
  "Deepening creative projects and finding new inspiration.",
  "Prioritizing self-care and finding inner peace.",
  "Facing a fear head-on.",
];

// --- STYLED COMPONENTS ---

const BackgroundKeyframes = keyframes`
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
`;

const PosterContainer = styled(motion.div)`
  min-height: calc(100vh - 100px);
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MoviePoster = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 800px;
  background: 
    /* Gradient overlay for drama and text visibility */
    linear-gradient(to top, rgba(18, 18, 18, 1) 0%, rgba(18, 18, 18, 0.8) 20%, rgba(18, 18, 18, 0.6) 50%, rgba(18, 18, 18, 0.5) 100%),
    /* Image background */
    url('/images/future-poster.jpg') no-repeat center center; /* 👈 Placeholder Image */
  background-size: cover;
  border: 5px solid var(--color-accent);
  box-shadow: 0 0 40px rgba(255, 51, 102, 0.6);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  
  /* Apply subtle shifting color effect to border/shadow for K-Drama drama */
  animation: ${BackgroundKeyframes} 60s infinite alternate;
`;

const Tagline = styled(motion.p)`
  font-family: var(--font-secondary);
  color: white;
  font-size: 1.5rem;
  letter-spacing: 2px;
  margin-bottom: 10px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
`;

const MainTitle = styled(motion.h1)`
  font-family: var(--font-primary);
  color: var(--color-accent);
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 0 15px var(--color-accent);
`;

const Subtitle = styled(motion.h3)`
  font-family: var(--font-primary);
  color: white;
  font-size: 1.8rem;
  margin-bottom: 30px;
  border-bottom: 3px solid var(--color-accent);
  padding-bottom: 5px;
`;

const Synopsis = styled.div`
  width: 80%;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const GoalList = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  margin-top: 15px;
`;

const GoalItem = styled(motion.li)`
  font-family: var(--font-secondary);
  font-size: 1.2rem;
  color: #ffb3cc; /* Lighter pink for list items */
  margin-bottom: 8px;
  text-shadow: 0 0 2px #000;

  &:before {
    content: '★ ';
    color: var(--color-accent);
  }
`;

const ComingSoonText = styled(motion.div)`
  position: absolute;
  top: 50px;
  right: 50px;
  padding: 10px 20px;
  background-color: var(--color-accent);
  color: var(--color-background);
  font-family: var(--font-primary);
  font-weight: 900;
  font-size: 1.5rem;
  transform: rotate(10deg);
`;


// --- REACT COMPONENT ---
export default function Future() {
  return (
    <PosterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <MoviePoster>
        
        <ComingSoonText
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 150 }}
        >
            SEASON 2
        </ComingSoonText>

        <Synopsis>
          <Tagline 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            A Drama About Growth, Ambition, and Unstoppable Charm.
          </Tagline>

          <MainTitle
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 80 }}
          >
            THE NEXT LEVEL
          </MainTitle>
          
          <Subtitle>
            EPISODES AIRING ALL YEAR
          </Subtitle>

          <GoalList>
            {newSeasonGoals.map((goal, index) => (
              <GoalItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8 + index * 0.2, duration: 0.4 }}
              >
                {goal}
              </GoalItem>
            ))}
          </GoalList>
        </Synopsis>
      </MoviePoster>
    </PosterContainer>
  );
}