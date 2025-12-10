import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- NAV DATA ---
const navLinks = [
  { to: '/home', label: 'Home' }, // Home is now the LandingPage
  { to: '/episodes', label: 'The Impact' },
  { to: '/profile', label: 'Her Era' },
  { to: '/gallery', label: 'Sour & Sweet' },
  { to: '/timeline', label: 'Discography' },
  { to: '/locker', label: 'Vanity' },
  { to: '/future', label: 'Season 2' },
  { to: '/guestbook', label: 'Fan Mail' },
  { to: '/style', label: 'Vogue' },
];

// --- STYLED COMPONENTS ---
const NavWrapper = styled(motion.header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Dark translucent background for Netflix look */
  background: rgba(18, 18, 18, 0.8); 
  backdrop-filter: blur(5px);

  @media (max-width: 768px) {
    padding: 15px 20px;
    flex-direction: column; /* Stack logo and links */
    height: auto; /* Allow height to expand */
  }
`;

const Logo = styled(Link)`
  font-family: var(--font-primary);
  font-size: 2rem;
  font-weight: 900;
  color: var(--color-accent);
  letter-spacing: 2px;
  text-shadow: 0 0 5px rgba(255, 51, 102, 0.5);
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 25px;

  @media (max-width: 768px) {
    width: 100%;
    gap: 10px;
    justify-content: space-around; /* Distribute links evenly */
    margin-top: 10px;
  }
`;

const NavItem = styled(Link)`
  font-family: var(--font-primary);
  font-size: 1.1rem;
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  color: ${({ $isActive }) => ($isActive ? 'var(--color-accent)' : 'var(--color-text)')};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.7)};
  transition: opacity 0.2s, color 0.2s;

  &:hover {
    color: var(--color-accent);
    opacity: 1;
    text-shadow: 0 0 3px rgba(255, 51, 102, 0.3);
  }
`;

// --- REACT COMPONENT ---
export default function Header() {
  const location = useLocation();

  return (
    <NavWrapper
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
    >
      <Logo to="/home">
        PROTOCOL OLIVIA
      </Logo>
      <NavLinks>
        {navLinks.map((link) => (
          <NavItem 
            key={link.to} 
            to={link.to} 
            $isActive={location.pathname === link.to}
            whileHover={{ scale: 1.05 }}
          >
            {link.label}
          </NavItem>
        ))}
      </NavLinks>
    </NavWrapper>
  );
}