import React, {useState} from "react";
import axios from "axios";


function RecipeCard({ recipe }) {

  // store selected Recipe ID in state so React can re-render UI when the data arrives
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleViewRecipe = async () => {
    try {
      // Send GET request to backend API, passing recipe ID as a query parameter
      const response = await axios.get(`http://localhost:8080/api/spoonacular/recipesById?id=${recipe.id}`);

      // store the ID in state *AFTER* the call
      setSelectedRecipeId(recipe.id);

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
        <button type="button" onClick={async () => {
          await handleViewRecipe();
          setShowModal(true); 
          }}> 
          View full recipe </button>
        {showModal && <Modal id={recipe.id} onClose={() => setShowModal(false)}/>}
      </div>
    </div>
  );
}


export default RecipeCard;
