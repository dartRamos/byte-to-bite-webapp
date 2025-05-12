import React from "react";
import '../App.css';
import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card-link">
      <div className="recipe-card">
        <div>
          <strong>Name:</strong>
          
          <span>{recipe?.title}</span>
        </div>
        <div className="recipe-content">
          
          <img src={recipe?.image} alt={recipe?.title} />

          
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
    </Link>
  );
}

export default RecipeCard;
