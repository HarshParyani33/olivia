import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
`;

export default function Home() {
  return (
    <HomeContainer>
      {/* This is a placeholder. Next, we will build the "Loading Main Character" animation here! */}
      🎉 WELCOME TO THE MAIN ERA! 🎉
    </HomeContainer>
  );
}