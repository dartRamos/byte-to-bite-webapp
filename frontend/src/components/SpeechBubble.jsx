import React from 'react';
import bubble from '../assets/bubble.png'
import '../styling/SpeechBubble.css';
import { motion } from 'framer-motion';

const SpeechBubble = () => {
  return (
    <motion.img 
      src={bubble} 
      alt="Speech bubble" 
      className="speech-bubble"
      initial={{ x: -900, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{
        scale: 1.05,
      }}
    />
  );
};

export default SpeechBubble;