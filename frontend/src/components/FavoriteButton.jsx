import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import axios from 'axios';
import '../styling/FavoriteButton.css'

const FavoriteButton = ({fullRecipe, initialFavorited = false, onFavoritesChange}) => {

  // state to control if is favourite 
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  const [showPopup, setShowPopup] = useState(false);

  // Function to handle the click
  const handleClick = async () => {

  const newFavoritedState = !isFavorited;
  setIsFavorited(newFavoritedState); 

  // If newFavoritedState is true, means the recipe is liked = save to the db
  if (newFavoritedState) {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);

    // SAVE to the db (POST)
    try {
      await axios.post('http://localhost:8080/db/save-recipe', {
        ...fullRecipe,
        is_favorited: true,
      });

      console.log('Recipe saved to the DB');

      // Call the callback to notify parent to refresh
      if (onFavoritesChange) {
        onFavoritesChange();
      }

    } catch (error) {
      console.log('Failed to save recipe:', error);
    }
  // If newFavoritedState is false, means the recipe is NOT liked = removes from the db
  } else {

    //  REMOVE recipe from DB (DELETE)
    try {
      await axios.delete('http://localhost:8080/db/remove-recipe', {
        data: { recipe_id: fullRecipe.id },
      });
      console.log('Recipe removed from the DB');

      // Call the callback to notify parent to refresh
      if (onFavoritesChange) {
        onFavoritesChange();
      }
      
    } catch (error) {
      console.log('Failed to remove recipe:', error);
    }
  }
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
