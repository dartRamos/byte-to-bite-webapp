import IngredientForm from "./IngredientForm"
import RecipesByIngredients from "./RecipesByIngredients"
import { useState } from "react";

function SearchPage () {

const [ingredients, setIngredients] = useState(""); // State to store user input
  
  const handleFormSubmit = (data) => {
    const combinedIngredients = Object.values(data)
      .flat()
      .filter(item => item.trim() !== "")
      .join(", ");

    setIngredients(combinedIngredients);
    console.log("Form Data:", ingredients);
    // Pass the ingredients to the RecipesByIngredients component
    // Process the form data (e.g., send it to the backend)
  };

  return (
    <div className="SearchPage">
      <IngredientForm onSubmit={handleFormSubmit} />
      <RecipesByIngredients ingredients={ingredients}/>
    </div>
  );
}

export default SearchPage;