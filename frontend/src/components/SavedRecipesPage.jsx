import { useEffect, useState } from "react";
import SavedRecipesCard from "./SavedRecipesCard";
import axios from "axios";

const SavedRecipesPage = () => {
  
  const testingPage = async () => {
     try {
      // Send GET request to backend API, passing recipe ID as a query parameter
      const response = await axios.get(`http://localhost:8080/db/saved-recipes`);

      console.log(response);

      } catch (error) {
      console.error("Error fetching recipe info:", error.message);
    }
  };


  return (
    <div>
      <h1>Saved Recipes</h1>
      {/* Add a button to trigger testingPage */}
      <button onClick={testingPage}>Fetch Saved Recipes</button>
      
      <SavedRecipesCard />
    </div>
  )
};

export default SavedRecipesPage;
