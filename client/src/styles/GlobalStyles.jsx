import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  /* --- IMPORT FONTS (Now linked in index.html) --- */
  
  :root {
    --color-background: #121212; /* Deep Black */
    --color-accent: #ff3366;    /* Hot Pink */
    --color-text: #ffffff;
    
    /* Using Playfair Display for elegance/pop, and Permanent Marker for the handwritten/grunge look */
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
  }

  #root {
    min-height: 100vh;
  }

  /* Typography for the theme */
  h1, h2, h3 {
    font-family: var(--font-primary); /* Use primary for titles too, or secondary for a handwritten look */
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
    @media (max-width: 768px) {
    /* Reduce padding and font sizes globally on smaller screens */
    #root {
      padding: 0 15px;
    }
    
    body {
      font-size: 14px;
    }

    /* Reduce default large titles */
    h1 {
      font-size: 2.5rem !important; /* !important used sparingly to override component styles */
    }
    h2 {
      font-size: 1.8rem !important;
    }
  }

  /* Media query for small phones */
  @media (max-width: 480px) {
    h1 {
      font-size: 2rem !important;
    }
  }
`;

export default GlobalStyles;