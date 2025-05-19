import IngredientForm from "./IngredientForm";
import RecipesByIngredients from "./RecipesByIngredients";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../styling/SearchPage.css';

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstLoad = useRef(true);

  // On refresh, clear sessionStorage for search state
  useEffect(() => {
    if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
      sessionStorage.removeItem("searchIngredients");
      // Remove query string from URL on refresh
      if (location.search) {
        window.history.replaceState({}, document.title, location.pathname);
      }
    }
  }, [location]);

  // Read ingredients from the URL query string
  const params = new URLSearchParams(location.search);
  const initialIngredients =
    sessionStorage.getItem("searchIngredients") && isFirstLoad.current
      ? sessionStorage.getItem("searchIngredients")
      : params.get("ingredients") || "";

  const [ingredients, setIngredients] = useState(initialIngredients);

  // Save state to sessionStorage when navigating away
  useEffect(() => {
    // Only save if not first load (to avoid overwriting restored state)
    if (!isFirstLoad.current) {
      sessionStorage.setItem("searchIngredients", ingredients);
    }
  }, [ingredients]);

  // If the URL changes (e.g., user presses back), update the state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setIngredients(params.get("ingredients") || "");
    isFirstLoad.current = false;
  }, [location.search]);

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