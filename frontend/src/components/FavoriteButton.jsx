import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import '../styling/FavoriteButton.css'

const FavoriteButton = ({fullRecipe}) => {

  // state to control if is favourite 
  const [isFavorited, setIsFavorited] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  // Function to handle the click
  const handleClick = async () => {
    setIsFavorited(!isFavorited); 


    // Show popup only when favorited
    if (!isFavorited) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000); // hide after 1 second
    }

    try {
      await axios.post('http://localhost:8080/api/save-recipe', {
        ...fullRecipe,
        is_favorited: true 
      });

      console.log('Recipe saved successfully');
    } catch (error) {
      console.log('Failed to save recipe:', error);
    };

  };

  return (
    <div>
      <div className="tooltip-wrapper">
        <button
          className='fav-button'
          onClick={handleClick}
          
        >
          <Heart 
            size={36}
            className={`fav-icon ${isFavorited ? 'favorited' : ''}`} 
          />

          {!isFavorited && <span className="tooltip-text">Save this recipe</span>}
          
        </button>
      </div>

      {showPopup && (
        <div className="popup-notification">
          Recipe saved!
        </div>
      )}
      
    </div>
  )
};

export default FavoriteButton;
