// client/src/components/VideoPlayer.jsx

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// This component expects a full Cloudinary URL or embed path.
// Cloudinary links typically look like: https://res.cloudinary.com/[cloud_name]/video/upload/...
const VideoFrame = styled(motion.video)`
  /* Base style: ensure element is flexible */
  width: 100%;
  height: auto;
  background-color: black;
  
  /* Removed hardcoded sizing/borders to allow the parent styled component
     to fully control the look and turn it into a full-screen background. */
`;

export default function VideoPlayer({ src, title, controls = true, loop = false, autoPlay = false, muted = false, ...props }) {
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
        {...props} /* Pass through styled component's class/styles */
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </VideoFrame>
  );
}