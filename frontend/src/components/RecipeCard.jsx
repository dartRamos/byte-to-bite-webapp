import React, {useState} from "react";
import '../App.css';
import axios from "axios";
import RecipeModal from "./RecipeModal";


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
      <div>
        <strong>Name: </strong>
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

        {/* Add button to trigger full recipe fetch */}
        <button type="button" onClick={handleViewRecipe}> View full recipe </button>
      </div>

      {/* When showModal is true, and there is a selected Recipe, render modal */}
      {/* passes function onClose and the full recipe as a prop to RecipeModal component */}
      {showModal && selectedRecipe && 
        <RecipeModal 
          fullRecipe={selectedRecipe}
          onClose={() => {
            setShowModal(false); 
            setSelectedRecipe(null);
          }} 
        />
      }
    </div>
  );
}

export default RecipeCard;
