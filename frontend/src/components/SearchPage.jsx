import IngredientForm from "./IngredientForm";
import RecipesByIngredients from "./RecipesByIngredients";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styling/SearchPage.css';

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read ingredients from the URL query string
  const params = new URLSearchParams(location.search);
  const initialIngredients =
    sessionStorage.getItem("searchIngredients") 
      ? sessionStorage.getItem("searchIngredients")
      : params.get("ingredients") || "";

  const [ingredients, setIngredients] = useState(initialIngredients);

  // When the form is submitted, update the URL with the new ingredients
  const handleFormSubmit = (data) => {
    const combinedIngredients = Object.values(data)
      .flat()
      .filter((item) => item.trim() !== "")
      .join(", ");

    setIngredients(combinedIngredients);
    navigate(`?ingredients=${encodeURIComponent(combinedIngredients)}`);
  };

  return (
    <div className="SearchPage">
      <div className="ingredient-form-sidebar">
        <IngredientForm onSubmit={handleFormSubmit} />
      </div>
      <div className="recipes-section">
        <RecipesByIngredients ingredients={ingredients} />
      </div>
    </div>
  );
}

export default SearchPage;