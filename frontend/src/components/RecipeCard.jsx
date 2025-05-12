import React from "react";
import '../App.css';

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <div>
        <strong>Name:</strong>
        <a target="_blank" rel="noopener noreferrer" href={recipe?.sourceUrl}>
          {recipe?.title}
        </a>
      </div>
      <div className="recipe-content">
        {/* Image */}
        <img src={recipe?.image} alt={recipe?.title} />

        {/* Ingredients */}
        {recipe?.usedIngredients?.length > 0 && (
          <div className="ingredients">
            <strong>Ingredients Used:</strong>
            <ul>
              {recipe.usedIngredients.map((ingredient, i) => (
                <li key={i}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;