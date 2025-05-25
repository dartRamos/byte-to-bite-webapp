import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import fridge from '../assets/fridgefinal.png';
import '../styling/Fridge.css';
import SpeechBubble from './SpeechBubble';

const recipePositions = [
  { top: '20%', left: '15%' },
  { top: '40%', left: '10%' },
  { top: '60%', left: '25%' },
  { top: '30%', left: '35%' },
  { top: '55%', left: '40%' },
]; 

function Fridge({ recipes = [] }) {
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

      {recipes.slice(0, 5).map((recipe, index) => (
        <img
          key={recipe.recipe_id}
          src={recipe.image_url}
          alt={recipe.title}
          className="recipe-overlay-image"
          style={recipePositions[index]} // position them according to your design
          title={recipe.title}
        />
      ))}

      <SpeechBubble />
    </div>
  );
}

export default Fridge;
