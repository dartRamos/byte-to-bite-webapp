import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import '../styling/FavouriteButton.css'

const FavouriteButton = () => {
  // state to control if is favourite 
  const [isFavorited, setIsFavorited] = useState(false);

  // Function to hangle the click
  const handleClick = () => {
    setIsFavorited(!isFavorited); 
    //console.log("FIRE");
    // Add code to save favorite to DB here

  };

  return (
    <div>
      <button
        className='fav-button'
        onClick={handleClick}
         >
          <Heart 
            size={36}
            className={`fav-icon ${isFavorited ? 'favorited' : ''}`} 
          />
      </button>
      
    </div>
  )
};

export default FavouriteButton;
