import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: var(--color-background);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  font-size: 2rem;
  padding: 50px;
`;

const Title = styled.h1`
  color: var(--color-accent);
  margin-bottom: 30px;
`;

export default function TheImpact() {
  return (
    <Container>
      <Title>// THE IMPACT // </Title>
      <p>This will be the Netflix-style interface for the video tributes.</p>
    </Container>
  );
}