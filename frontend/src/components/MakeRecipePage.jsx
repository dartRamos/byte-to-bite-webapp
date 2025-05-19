import { useLocation } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import "../styling/MakeRecipePage.css";

function MakeRecipePage({ onFavoritesChange }) {
  const location = useLocation();
  const fullRecipe = location.state?.recipe;

  // You can set isFavorite logic as needed
  const isFavorite = false;

  if (!fullRecipe) {
    return <div>No recipe data found.</div>;
  }

  return (
    <div className="make-recipe-page">
      <div className="make-recipe-content">

        {/* Favourite button */}
        <FavoriteButton 
          fullRecipe={fullRecipe} 
          initialFavorited={isFavorite}
          onFavoritesChange={onFavoritesChange}
        />

        {/* Title */}
        <h1 className="make-recipe-title">{fullRecipe.title}</h1>

        {/* Image */}
        {fullRecipe.image && (
          <img 
            src={fullRecipe.image} 
            alt={fullRecipe.title} 
            className="make-recipe-image"
          />
        )}

        {/* Time and Servings */}
        <div className="make-recipe-meta">
          <p><strong>Ready in:</strong> {fullRecipe.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {fullRecipe.servings}</p>
        </div>

        {/* Ingredients */}
        {fullRecipe.extendedIngredients?.length > 0 && (
          <div className="make-recipe-ingredients">
            <h3 className="make-recipe-section-title">Ingredients</h3>
            <ul className="make-recipe-ingredient-list">
              {fullRecipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {fullRecipe.instructions && (
          <div className="make-recipe-instructions">
            <h3 className="make-recipe-section-title">Instructions</h3>
            <div
              className="make-recipe-instructions-content"
              dangerouslySetInnerHTML={{ __html: fullRecipe.instructions }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default MakeRecipePage;