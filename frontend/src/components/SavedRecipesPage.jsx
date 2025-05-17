import { useEffect, useState } from "react";
import SavedRecipesCard from "./SavedRecipesCard";
import axios from "axios";
import '../styling/SavedRecipesPage.css'

const SavedRecipesPage = () => {

  // State to save recipes info
  const [savedRecipes, setSavedRecipes] = useState([]);
  
  const fetchSavedRecipes = async () => {

    // Fetch the data from your backend
     try {
      // Send GET request to backend DB
      const response = await axios.get(`http://localhost:8080/db/saved-recipes`);

      // save the updated response from db in state 
      setSavedRecipes(response.data);

      } catch (error) {
      console.error("Error fetching recipe info:", error.message);
    }
  };

  // useEffect to fetch data only after the component mounts (not during rendering).
  useEffect(() => {
    fetchSavedRecipes();
  }, []);


  return (
    <div className="saved-recipes-page">
      <h1>Saved Recipes</h1>

      {/* Pass recipes array as a prop */}
      <SavedRecipesCard savedRecipes={savedRecipes} onFavoritesChange={fetchSavedRecipes}/>
    </div>
  )
};

export default SavedRecipesPage;
