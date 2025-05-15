import { useState } from "react";
import axios from 'axios';
import RecipeCard from './RecipeCard'; // Import the RecipeCard component
import { useEffect } from "react";

function RecipesByIngredients(props) {
  useEffect(() => {
    // setIngredients(props.ingredients);
    if(props.ingredients !== ""){getRecipes(props.ingredients);}
  }, [props.ingredients]);

  const [recipe, setRecipe] = useState([]); // State to store multiple recipes
  // const [ingredients, setIngredients] = useState(""); // State to store user input
  const [currentPage, setCurrentPage] = useState(0); // State to track the current page

  async function getRecipes(ingredients) {
    try {
      // Call the backend endpoint with user-provided ingredients
      const response = await axios.get('http://localhost:8080/api/spoonacular/RecipesByIngredients', {
        params: { ingredients } // Pass ingredients as query parameters
      });
      console.log('Recipe data: ', response.data)
      setRecipe(response.data); // Update state with all recipes
      setCurrentPage(0); // Reset to the first page on new search
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="grid grid-cols-5 grid-rows-5 gap-4">
      {/* Recipe display */}
      {recipe.length > 0 && (
        <div className="recipes">
          {recipe.slice(currentPage * 6, currentPage * 6 + 6).map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} /> // Use RecipeCard component
          ))}
        </div>
      )}

      {/* Pagination buttons */}
      <div className="pagination">
        {/* Button to go back to the previous page */}
        {currentPage > 0 && (
          <button onClick={() => setCurrentPage(currentPage - 1)}>
            Previous Recipes
          </button>
        )}

        {/* Button to load the next page */}
        {recipe.length > (currentPage + 1) * 6 && (
          <button onClick={() => setCurrentPage(currentPage + 1)}>
            Load More Recipes
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipesByIngredients;
