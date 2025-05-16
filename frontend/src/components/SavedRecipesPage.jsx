import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import axios from "axios";

const SavedRecipesPage = () => {

  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
  axios.get('/api/favorites/saved-recipes')
    .then((res) => setSavedRecipes(res.data))
    .catch((err) => console.error("Error loading saved recipes:", err));
  }, []);


  return (
    <div className="saved-recipes-page">
      <h1>All Saved Recipes </h1>
      <div className="recipe-grid">
        {savedRecipes.map(({ recipe_id, title, image_url }) => (
         <RecipeCard
           key={recipe_id}
           recipe={{ id: recipe_id, title, image: image_url }}
        />
        ))}


      </div>
    </div>
  )
};

export default SavedRecipesPage;
