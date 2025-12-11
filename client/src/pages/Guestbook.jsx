import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Set your backend API URL here (it should be where your Express server is running)
const API_URL = 'https://protocol-kitkat-2.onrender.com/api/guestbook';

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
  cursor: pointer; /* 👈 Enable clicking */
  transition: box-shadow 0.2s;
  
  &:hover {
    box-shadow: 0 0 20px var(--color-accent); /* Glow effect on hover */
  }
`;

// 👈 NEW COMPONENT: Message Teaser for Truncation
const MessageTeaser = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Show max 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 5px;
  line-height: 1.4;
`;


const Author = styled.p`
  font-weight: bold;
  color: var(--color-accent);
  margin-top: 10px;
  border-top: 1px dashed #121212;
  padding-top: 5px;
`;

// 👈 NEW COMPONENTS: Modal for Detail View
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ModalCard = styled(motion.div)`
  /* FIX: Change background to match the MessageCard's off-white paper color */
  background: #fff0f5; 
  
  color: #121212;
  padding: 40px;
  border-radius: 15px;
  
  /* FIX: Change shadow glow and border to match the Burn Book aesthetic */
  box-shadow: 0 0 50px var(--color-accent);
  max-width: 600px;
  width: 90%;
  font-family: var(--font-secondary);
  position: relative;
  
  /* Use the dashed pink border like the MessageCard uses, but slightly cleaner */
  border: 4px dashed var(--color-accent); 
  
  white-space: pre-wrap;
`;

const ModalMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 20px;
`;

const ModalAuthor = styled(Author)`
  border-top: none;
`;

const CloseButton = styled(motion.button)`
  margin-top: 25px;
  padding: 10px 20px;
  background-color: #121212;
  color: var(--color-accent);
  border: 3px solid var(--color-accent);
  font-family: var(--font-primary);
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
`;


// --- REACT COMPONENT ---
export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [formData, setFormData] = useState({ author: '', message: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 👈 NEW STATE
  const [selectedEntry, setSelectedEntry] = useState(null); 

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

  // SUBMIT ENTRY (CREATE) - (Remains the same)
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
        const errorMsg = Object.values(newEntry).join(', ');
        setError(`Error: ${errorMsg}`);
        return;
      }

      setEntries([newEntry, ...entries]); 
      setFormData({ author: '', message: '' });
      setError(null);
    } catch (err) {
      setError('A network error occurred.');
    }
  };
  
  // 👈 NEW HANDLERS
  const handleCardClick = (entry) => setSelectedEntry(entry);
  const handleCloseModal = () => setSelectedEntry(null);


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
            $rotate={Math.random() * 6 - 3} 
            onClick={() => handleCardClick(entry)} 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <MessageTeaser>{entry.message}</MessageTeaser> {/* 👈 TRUNCATED */}
            <Author>- {entry.author}</Author>
          </MessageCard>
        ))}
      </MessagesGrid>
      
      {/* 👈 MODAL OVERLAY */}
      {selectedEntry && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseModal}
        >
          <ModalCard
            // Prevent modal from closing when clicking inside the message card
            onClick={(e) => e.stopPropagation()} 
            initial={{ scale: 0.8, rotate: 2 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ModalMessage>{selectedEntry.message}</ModalMessage>
            <ModalAuthor>- {selectedEntry.author}</ModalAuthor>
            <CloseButton 
                onClick={handleCloseModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
              TEAR OUT PAGE
            </CloseButton>
          </ModalCard>
        </ModalOverlay>
      )}
    </GuestbookContainer>
  );
}