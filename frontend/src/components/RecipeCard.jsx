import React, { useState } from "react";
import '../App.css';
import axios from "axios";
import RecipeModal from "./RecipeModal";
import '../styling/RecipeCard.css';

function RecipeCard({ recipe }) {

  // store selected Recipe in state so React can re-render 
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // state to control modal
  const [showModal, setShowModal] = useState(false); 

  const handleViewRecipe = async () => {
    try {
      // Send GET request to backend API, passing recipe ID as a query parameter
      const response = await axios.get(`http://localhost:8080/api/spoonacular/recipesById?id=${recipe.id}`);

      // store recipe data in state *AFTER* the call
      setSelectedRecipe(response.data);

      // triggers modal 
      setShowModal(true);
    
      //console logging the data for debugging
      console.log("Full recipe data:", response.data)
      
    } catch (error) {
      console.error("Error fetching recipe info:", error.message);
    }
  };

  return (
    <div className="recipe-card">
      {/* Recipe Title */}
      <div className="recipe-title">
        <strong>{recipe?.title}</strong>
      </div>

      {/* Recipe Image */}
      <div className="recipe-image">
        <img
          src={recipe?.image}
          alt={recipe?.title}
          className="recipe-img"
        />
      </div>

      {/* Ingredients */}
      {recipe?.usedIngredients?.length > 0 && (
        <div className="ingredients">
          <strong>Ingredients Used:</strong>
          <ul className="ingredient-list">
            {recipe.usedIngredients.map((ingredient, i) => (
              <li key={i}>{ingredient.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* View Full Recipe Button */}
      <button
        type="button"
        onClick={handleViewRecipe}
        className="view-recipe-btn"
      >
        View Full Recipe
      </button>

      {/* Modal */}
      {showModal && selectedRecipe && (
        <RecipeModal
          fullRecipe={selectedRecipe}
          onClose={() => {
            setShowModal(false);
            setSelectedRecipe(null);
          }}
        />
      )}
    </div>
  );
}

export default RecipeCard;