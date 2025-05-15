import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import '../styling/FavoriteButton.css'

const FavoriteButton = () => {
  // state to control if is favourite 
  const [isFavorited, setIsFavorited] = useState(false);

  const [showPopup, setShowPopup] = useState(false);

  // Function to handle the click
  const handleClick = () => {
    setIsFavorited(!isFavorited); 
    //console.log("FIRE");

    // Show popup only when favorited
    if (!isFavorited) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000); // hide after 1 second
    }

    // Add code to save favorite to DB here

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
