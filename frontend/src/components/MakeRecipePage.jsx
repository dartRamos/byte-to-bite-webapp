import { useLocation, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import IngredientSubstitutions from "./IngredientSubstitutions";
import "../styling/MakeRecipePage.css";
import CountdownTimer from "./CountdownTimer";
import Converter from "./Converter";
import NutritionLabelModal from "./NutritionLabelModal";
import React from 'react';

function MakeRecipePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const missedIngredients = location.state?.missedIngredients;
  const usedIngredients = location.state?.usedIngredients;
  const fullRecipe = location.state?.fullRecipe;
  const [showNutritionModal, setShowNutritionModal] = React.useState(false);
  const [showConverterModal, setShowConverterModal] = React.useState(false);
  const [showSubstitutionsModal, setShowSubstitutionsModal] = React.useState(false); // <-- Add this line

  const usedNames = new Set(usedIngredients?.map(i => i.name?.toLowerCase()) || []);
  const missedNames = new Set(missedIngredients?.map(i => i.name?.toLowerCase()) || []);
  const remainingIngredients = (fullRecipe.extendedIngredients || []).filter(
    ing => !usedNames.has(ing.name?.toLowerCase()) && !missedNames.has(ing.name?.toLowerCase())
  );

  if (!fullRecipe) {
    return <div>No recipe data found.</div>;
  }

  return (
    <div className="make-recipe-page">
      <div className="make-recipe-content">
        <div className="make-recipe-main">
          {/* Return Button */}
          <button
            className="make-recipe-return-btn"
            onClick={() => navigate(-1)}
          >
            &larr; Return
          </button>
          <div className="recipe-summary-card">
          {/* Title */}
          <h1 className="make-recipe-title">{fullRecipe.title}</h1>

          {/* Image */}
          {fullRecipe.image && (
            <img 
              src={fullRecipe.image} 
              alt={fullRecipe.title} 
              className="make-recipe-image"
            />
          )}

          {/* Favourite button */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", justifyContent: "center", marginBottom: "0.5rem" }}>
            <FavoriteButton fullRecipe={fullRecipe} />
            <span style={{ fontFamily: '"Shadows Into Light Two", cursive', fontSize: "1.1rem", color: "#ff7043" }}>
              Save this recipe
            </span>
          </div>

          {/* Time and Servings */}
          <div className="make-recipe-prep-info">
            <p><strong>Ready in:</strong> {fullRecipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> {fullRecipe.servings}</p>
          </div>

          {/* Ingredients */}
          <div className="make-recipe-ingredients">
            {missedIngredients?.length > 0 && (
              <div className="shopping-list">
                <h3 className="make-recipe-section-title">Shopping List</h3>
                <ul className="make-recipe-ingredient-list">
                  {missedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original || ingredient.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {usedIngredients?.length > 0 && (
              <div className="your-ingredients">
                <div>
                  <span className="your-ingredients-title">Your Ingredients</span>
                </div>
                <ul className="make-recipe-ingredient-list">
                  {usedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original || ingredient.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {remainingIngredients.length > 0 && (
              <div className="other-ingredients">
                <span className="other-ingredients-title">Pantry Ingredients</span>
                <ul className="make-recipe-ingredient-list">
                  {remainingIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
          {/* Recipe Helper Buttons */}
          <div className="recipe-helper-buttons">
            {/* Nutrition Label Button at the bottom */}
            <button
              className="nutrition-label-btn"
              style={{ marginTop: "2rem" }}
              onClick={() => setShowNutritionModal(true)}
            >
              View Nutrition Label
            </button>

            {/* Substitutions Button */}
            <button
              className="substitutions-btn"
              style={{ marginTop: "1rem" }}
              onClick={() => setShowSubstitutionsModal(true)}
            >
              Find Ingredient Substitutions
            </button>

            {/* Converter Button */}
            <button
              className="converter-btn"
              style={{ marginTop: "1rem" }}
              onClick={() => setShowConverterModal(true)}
            >
              Convert Measuring Units
            </button>
          </div>
        </div>

        {/* Stack instructions and substitutions vertically */}
        <div className="make-recipe-instructions-column">
          {fullRecipe.instructions && (
            <div className="make-recipe-instructions">
              <h3 className="make-recipe-instructions-title">Instructions</h3>
              {fullRecipe.analyzedInstructions?.length > 0 &&
               fullRecipe.analyzedInstructions[0].steps?.length > 0 ? (
                <ul className="make-recipe-instructions-content">
                  {fullRecipe.analyzedInstructions[0].steps.map((step, idx) => (
                    <li key={idx}>{step.step}</li>
                  ))}
                </ul>
              ) : (
                <ul className="make-recipe-instructions-content">
                  {fullRecipe.instructions
                    .split(/\. |\n/)
                    .filter(s => s.trim().length > 0)
                    .map((step, idx) => (
                      <li key={idx}>{step.trim()}</li>
                    ))}
                </ul>
              )}
            </div>
          )}

          <div className="timer-container">
            <h4 className="kitchen-timer">Kitchen Timers:</h4>
            <CountdownTimer />
          </div>
        </div>
      </div>

      {/* Nutrition Label Modal */}
      {showNutritionModal && (
        <NutritionLabelModal
          recipeId={fullRecipe.id}
          onClose={() => setShowNutritionModal(false)}
        />
      )}

      {/* Substitutions Modal */}
      <IngredientSubstitutions
        isOpen={showSubstitutionsModal}
        onClose={() => setShowSubstitutionsModal(false)}
      />

      {/* Converter Modal */}
      <Converter
        isOpen={showConverterModal}
        onClose={() => setShowConverterModal(false)}
      />
    </div>
  );
}

export default MakeRecipePage;