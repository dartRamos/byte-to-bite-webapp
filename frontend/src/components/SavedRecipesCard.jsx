import React, {useState} from "react";
import '../styling/SavedRecipesCard.css'
import axios from "axios";
import RecipeModal from "./RecipeModal";

const SavedRecipesCard = ({savedRecipes, onFavoritesChange}) => {

  // store selected Recipe in state so React can re-render 
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  // state to control modal
  const [showModal, setShowModal] = useState(false); 

  const handleViewRecipe = async (recipe) => {
    try {
      // Send GET request to backend API, passing recipe ID as a query parameter
      const response = await axios.get(`http://localhost:8080/api/spoonacular/recipesById?id=${recipe.recipe_id}`);

      // store recipe data in state *AFTER* the call
      setSelectedRecipe(response.data);

      // triggers modal 
      setShowModal(true);
    
      //console logging the data for debugging
      console.log("Full recipe data:", response.data)
      
    } catch (error) {
      console.error("Error fetching recipe info:", error.message);
    }
     console.log("Modal should show:", showModal);
  };

  return (
    <div className="saved-recipe-container">
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <div className="saved-recipes-grid">
          {savedRecipes.map(recipe => (
            <div key={recipe.recipe_id} className="recipe-card">
              <h2 className="recipe-title">{recipe.title}</h2>
              <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />

              {/* Add button to trigger full recipe fetch */}
              {/* Pass the recipe to the handler */}
              <button type="button" onClick={() => handleViewRecipe(recipe)}>View Full Recipe </button>
              
            </div>
            
          ))}
          
        </div>
      )}

      {/* When showModal is true, and there is a selected Recipe, render modal */}
      {/* passes function onClose and the full recipe as a prop to RecipeModal component */}
      {showModal && selectedRecipe && (
        <RecipeModal 
          fullRecipe={selectedRecipe}
          onClose={() => {
            setShowModal(false); 
            setSelectedRecipe(null);
          }} 
          isFavorite={true}
          onFavoritesChange={onFavoritesChange}
        />
      )}
      
    </div>
  )
};

export default SavedRecipesCard;
