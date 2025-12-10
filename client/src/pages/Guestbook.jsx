import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Set your backend API URL here (it should be where your Express server is running)
const API_URL = 'http://localhost:5000/api/guestbook'; 

// --- STYLED COMPONENTS (Burn Book Theme) ---

const GuestbookContainer = styled(motion.div)`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 100px);
  background-color: var(--color-background);
`;

const Title = styled.h2`
  font-size: 3rem;
  color: var(--color-accent);
  font-family: 'Permanent Marker', cursive; /* Handwritten/Burn Book look */
  margin-bottom: 40px;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.5);
  transform: rotate(-2deg);
`;

const FormWrapper = styled(motion.form)`
  background: #f77f9e; /* Pink paper color */
  border: 5px solid #121212;
  padding: 25px;
  width: 100%;
  max-width: 500px;
  margin-bottom: 50px;
  box-shadow: 5px 5px 0px #121212;
  transform: rotate(1deg); /* Slightly skewed for drama */

  h3 {
    font-family: var(--font-primary);
    color: #121212;
    margin-bottom: 15px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #121212;
  font-family: var(--font-secondary);
  background: #fff0f5; /* Off-white */
  color: #121212;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 2px solid #121212;
  font-family: var(--font-secondary);
  background: #fff0f5;
  color: #121212;
  font-size: 1rem;
  min-height: 100px;
`;

const SubmitButton = styled(motion.button)`
  padding: 12px 20px;
  background-color: #121212;
  color: var(--color-accent);
  border: 3px solid var(--color-accent);
  font-family: var(--font-primary);
  font-weight: bold;
  cursor: pointer;
  width: 100%;
  text-transform: uppercase;
`;

const MessagesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;

const MessageCard = styled(motion.div)`
  background: #fff0f5; /* Off-white paper color */
  color: #121212;
  padding: 20px;
  border: 4px dashed var(--color-accent);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  transform: rotate(${(props) => props.$rotate}deg); /* Random rotation */
  font-family: var(--font-secondary);
  white-space: pre-wrap; /* Preserve formatting for messages */
`;

const Author = styled.p`
  font-weight: bold;
  color: var(--color-accent);
  margin-top: 10px;
  border-top: 1px dashed #121212;
  padding-top: 5px;
`;


// --- REACT COMPONENT ---
export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ author: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH ENTRIES (READ)
  const fetchEntries = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch entries');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      setError('Could not load messages from the server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // SUBMIT ENTRY (CREATE)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.author || !formData.message) return;

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const newEntry = await res.json();
      
      if (!res.ok) {
        // Handle API validation errors
        const errorMsg = Object.values(newEntry).join(', ');
        setError(`Error: ${errorMsg}`);
        return;
      }

      setEntries([newEntry, ...entries]); // Add new entry to the top
      setFormData({ author: '', message: '' });
      setError(null);
    } catch (err) {
      setError('A network error occurred.');
    }
  };

  if (loading) {
    return <GuestbookContainer><Title>Loading Fan Mail...</Title></GuestbookContainer>;
  }

  return (
    <GuestbookContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Title>// FAN MAIL: THE BURN BOOK // </Title>

      {/* Input Form */}
      <FormWrapper onSubmit={handleSubmit}>
        <h3>Leave a Message, Superstar!</h3>
        <Input
          type="text"
          name="author"
          placeholder="Your Name (Author)"
          value={formData.author}
          onChange={handleChange}
          maxLength="50"
          required
        />
        <TextArea
          name="message"
          placeholder="Your Heartfelt/Salty Message (Max 500 chars)"
          value={formData.message}
          onChange={handleChange}
          maxLength="500"
          required
        />
        {error && <p style={{ color: 'red', marginBottom: '10px', fontFamily: 'var(--font-primary)' }}>{error}</p>}
        <SubmitButton
          type="submit"
          whileHover={{ scale: 1.02, backgroundColor: 'var(--color-background)', color: 'white' }}
          whileTap={{ scale: 0.98 }}
        >
          POST MESSAGE
        </SubmitButton>
      </FormWrapper>

      {/* Display Messages */}
      <MessagesGrid>
        {entries.map((entry) => (
          <MessageCard
            key={entry._id}
            $rotate={Math.random() * 6 - 3} // Random rotation between -3 and 3 degrees
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            {entry.message}
            <Author>- {entry.author}</Author>
          </MessageCard>
        ))}
      </MessagesGrid>
    </GuestbookContainer>
  );
}