import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* --- AESTHETIC BASELINE --- */
  
  :root {
    --color-background: #121212; /* Deep Black */
    --color-accent: #ff3366;    /* Hot Pink */
    --color-text: #ffffff;
    
    /* Fonts imported via link in index.html (Playfair Display, Permanent Marker) */
    --font-primary: 'Playfair Display', serif; 
    --font-secondary: 'Permanent Marker', cursive; 
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: var(--font-primary);
    line-height: 1.6;
    overflow-x: hidden;
    min-width: 320px; /* Ensure minimum width for Android compatibility */
  }

  #root {
    min-height: 100vh;
  }

  /* Typography for the theme */
  h1, h2, h3 {
    font-family: var(--font-primary);
    color: var(--color-accent);
    font-weight: 900;
  }

  a {
    color: var(--color-accent);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  /* --- RESPONSIVENESS MEDIA QUERIES --- */
  
  /* Tablets and large mobile (768px and below) */
  @media (max-width: 768px) {
    /* Adjust base font and global padding */
    body {
      font-size: 14px;
    }

    /* Reduce default large titles */
    h1 {
      font-size: 2.5rem !important; 
    }
    h2 {
      font-size: 1.8rem !important;
    }
    
    /* Note: If the Layout component is applying a fixed padding-left/right of 50px,
             you will need to update the padding properties within the Layout.jsx 
             file itself, or modify the container class in the Layout to accept
             this mobile padding. */
  }

  /* Small phones (480px and below) */
  @media (max-width: 480px) {
    h1 {
      font-size: 2rem !important;
    }
  }
`;

export default GlobalStyles;