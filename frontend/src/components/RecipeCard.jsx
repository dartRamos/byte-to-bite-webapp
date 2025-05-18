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

  // console.log("SELECTED RECIPE" , selectedRecipe)
  // console.log("Modal should show:", showModal);
  return (
    <div className="recipe-card border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center text-center">
      {/* Recipe Title */}
      <div className="mb-4">
        <strong className="text-lg font-semibold">{recipe?.title}</strong>
      </div>

      {/* Recipe Image */}
      <div className="mb-4">
        <img
          src={recipe?.image}
          alt={recipe?.title}
          className="w-full h-auto rounded-md"
        />
      </div>

      {/* Ingredients */}
      {recipe?.usedIngredients?.length > 0 && (
        <div className="ingredients mb-4">
          <strong>Ingredients Used:</strong>
          <ul className="list-disc list-inside">
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
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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