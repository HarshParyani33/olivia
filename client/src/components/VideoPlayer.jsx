// client/src/components/VideoPlayer.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// This component expects a full Cloudinary URL or embed path.
// Cloudinary links typically look like: https://res.cloudinary.com/[cloud_name]/video/upload/...
const VideoFrame = styled(motion.video)`
  width: 100%;
  max-width: 900px; /* Max width for cinematic viewing */
  height: auto;
  border: 3px solid var(--color-accent);
  box-shadow: 0 0 20px rgba(255, 51, 102, 0.7);
  border-radius: 8px;
  background-color: black;
`;

export default function VideoPlayer({ src, title, controls = true, loop = false, autoPlay = false, muted = false }) {
  return (
    <VideoFrame
        title={title}
        controls={controls}
        loop={loop}
        autoPlay={autoPlay}
        muted={muted}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </VideoFrame>
  );
}