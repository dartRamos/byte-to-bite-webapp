import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import fridge from '../assets/fridgefinal.png';
import '../styling/Fridge.css';
import SpeechBubble from './SpeechBubble.jsx';

function Fridge() {
  return (
    <div className="fridge-page">
      <Link to="/search" className="fridge-link">
        <motion.img
          src={fridge}
          alt="Fridge"
          className="fridge-image"
          animate={{ rotate: 0 }}
          whileHover={{
            rotate: [0, -4, 4, -2, 2, 0],
            transition: {
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            },
          }}
        />
      </Link>


      <SpeechBubble />
    </div>
  );
}

export default Fridge;
