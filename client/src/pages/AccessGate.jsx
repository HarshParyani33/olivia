import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// --- STYLED COMPONENTS ---
const AccessContainer = styled(motion.div)`
  background-color: #121212; /* Dark background */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
  font-family: 'Georgia', serif; /* A classic, elegant font for contrast */
`;

const Title = styled(motion.h1)`
  color: #ff3366; /* Hot Pink accent */
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 51, 102, 0.5); /* Glowing effect */
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border: 2px solid #ff3366;
  border-radius: 10px;
  box-shadow: 0 0 25px rgba(255, 51, 102, 0.7);
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1.1rem;
  border: 2px solid #333;
  border-radius: 5px;
  background-color: #222;
  color: white;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #ff3366;
    outline: none;
    box-shadow: 0 0 8px rgba(255, 51, 102, 0.5);
  }
`;

const PinInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

const PinInput = styled(Input)`
  width: 50px;
  text-align: center;
  font-weight: bold;
`;

const Button = styled(motion.button)`
  padding: 12px 20px;
  font-size: 1.2rem;
  font-weight: bold;
  background-color: #ff3366;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;

  &:hover {
    background-color: #e6004c;
  }
  &:active {
    transform: scale(0.98);
  }
`;

const ErrorMessage = styled.p`
  color: yellow;
  margin-top: 10px;
`;


// --- ACCESS GATE LOGIC ---
const CORRECT_PASSWORD = 'oreoshake'; // Placeholder, replace with your secret password
const CORRECT_PIN = '030124'; // Placeholder, replace with your 6-digit PIN (Her birthday?)

export default function AccessGate({ setAuthenticated }) {
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState(Array(6).fill(''));
  const [error, setError] = useState('');

  // Handle individual PIN box input
  const handlePinChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      // Focus on next input
      if (value && index < 5) {
        document.getElementById(`pin-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const submittedPin = pin.join('');

    if (password === CORRECT_PASSWORD && submittedPin === CORRECT_PIN) {
      // SUCCESS!
      localStorage.setItem('protocolOliviaAuth', 'true');
      setAuthenticated(true);
    } else {
      setError('💔 Incorrect password or PIN. Try again, superstar!');
      // Reset fields for security/clarity
      setPassword('');
      setPin(Array(6).fill(''));
      document.getElementById('pin-input-0').focus();
    }
  };

  return (
    <AccessContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
      <Title
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 120 }}
      >
        PROTOCOL OLIVIA ACCESS
      </Title>

      <Form onSubmit={handleSubmit}>
        <label>
          <Input
            type="password"
            placeholder="Secret Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <PinInputContainer>
            {pin.map((digit, index) => (
              <PinInput
                key={index}
                id={`pin-input-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handlePinChange(e, index)}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    // Move focus to the previous input on backspace
                    document.getElementById(`pin-input-${index - 1}`).focus();
                  }
                }}
                autoFocus={index === 0}
                required
              />
            ))}
          </PinInputContainer>
        </label>
        <Button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ENTER THE ERA
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AccessContainer>
  );
}