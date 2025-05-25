import React from 'react';
import { Heart } from 'lucide-react';
import '../styling/FavoriteButton.css'
import { useFavorites } from '../context/FavoritesContext';

const FavoriteButton = ({ fullRecipe }) => {
  const { isFavorited, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorited(fullRecipe.id);

  const handleClick = () => {
    if (favorited) {
      removeFavorite(fullRecipe.id);
    } else {
      addFavorite(fullRecipe);
    }
  };

  return (
    <div className="favorite-button-row">
      <div className="tooltip-wrapper">
        <button
          className='fav-button'
          onClick={handleClick}
        >
          <Heart
            size={36}
            className={`fav-icon ${favorited ? 'favorited' : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default FavoriteButton;
