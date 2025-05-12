import React, {useState} from "react";
import '../App.css';
import axios from "axios";


function RecipeCard({ recipe }) {
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const handleViewRecipe = async () => {
    try {
      // Call the backend API with the recipe ID
      // store the ID in state *after* the call, if needed for later
      const response = await axios.get(`http://localhost:8080/api/spoonacular/recipesById?id=${recipe.id}`)

      // store the ID in state *after* the call, if needed for later
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


            {/* Adding a button to see full recipe */}
           <button type="button" onClick={handleViewRecipe}> View full recipe </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;