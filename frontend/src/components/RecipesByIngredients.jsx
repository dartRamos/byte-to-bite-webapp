import { useState, useEffect } from "react";
import axios from 'axios';
import RecipeCard from './RecipeCard';
import '../styling/RecipesByIngredients.css';
import fridgeImg from '../assets/fridge.png';

function RecipesByIngredients(props) {
  const [recipe, setRecipe] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (props.ingredients !== "") {
      getRecipes(props.ingredients);
      setHasSearched(true);
    }
  }, [props.ingredients]);

  async function getRecipes(ingredients) {
    try {
      const response = await axios.get('http://localhost:8080/api/spoonacular/RecipesByIngredients', {
        params: { ingredients }
      });
      setRecipe(response.data);
      setCurrentPage(0);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  if (!recipe || recipe.length === 0) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        minHeight: "300px"
      }}>
        <img src={fridgeImg} alt="Empty fridge" style={{ width: "200px", opacity: 0.7 }} />
        <p className="empty-message">
          {hasSearched
            ? "Loading..."
            : "No recipes yet. Try adding ingredients!"}
        </p>
      </div>
    );
  }

  return (
    <div className="recipes-container">
      {/* Recipe display */}
      {recipe.length > 0 && (
        <div className="recipes-grid">
          {recipe.slice(currentPage * 6, currentPage * 6 + 6).map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      )}

      {/* Pagination buttons */}
      <div className="pagination">
        {currentPage > 0 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="pagination-btn"
          >
            Previous Recipes
          </button>
        )}

        {/* Button to load the next page */}
        {recipe.length > (currentPage + 1) * 6 && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="pagination-btn"
          >
            Load More Recipes
          </button>
        )}
      </div>
    </div>
  );
}

export default RecipesByIngredients;
