import IngredientForm from "./IngredientForm";
import RecipesByIngredients from "./RecipesByIngredients";
import { useState } from "react";

function SearchPage() {
  const [ingredients, setIngredients] = useState(""); // State to store user input

  const handleFormSubmit = (data) => {
    const combinedIngredients = Object.values(data)
      .flat()
      .filter((item) => item.trim() !== "")
      .join(", ");

    setIngredients(combinedIngredients);
    console.log("Form Data:", ingredients);
    // Pass the ingredients to the RecipesByIngredients component
    // Process the form data (e.g., send it to the backend)
  };

  return (
    <div className="SearchPage flex h-screen">
      {/* Left-hand side: IngredientForm */}
      <div className="w-1/5 h-full bg-gray-100 p-4 border-r border-gray-300">
        <IngredientForm onSubmit={handleFormSubmit} />
      </div>

      {/* Right-hand side: RecipesByIngredients */}
      <div className="w-4/5 p-4">
        <RecipesByIngredients ingredients={ingredients} />
      </div>
    </div>
  );
}

export default SearchPage;