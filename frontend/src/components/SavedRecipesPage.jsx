import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

const SavedRecipesPage = () => {

  const [savedRecipes, setSavedRecipes] = useState([]);


  return (
    <div className="saved-recipes-page">
      <h1>All Saved Recipes </h1>
      <div className="recipe-grid">
        {savedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />

        ))}


      </div>
    </div>
  )
};

export default SavedRecipesPage;
