import React, { useState } from 'react';
import { Heart } from 'lucide-react';

const FavouriteButton = () => {

  // Function to hangle the click
  const handleClick = () => {
    console.log("FIRE");

  }


  return (
    <div>
      <button
        onClick={handleClick}>
          FAVOURITE BUTTON

      </button>
      
    </div>
  )
};

export default FavouriteButton;
