import { useLocation, useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import IngredientSubstitutions from "./IngredientSubstitutions";
import "../styling/MakeRecipePage.css";
import CountdownTimer from "./CountdownTimer";

function MakeRecipePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const missedIngredients = location.state?.missedIngredients;
  const usedIngredients = location.state?.usedIngredients;
  const fullRecipe = location.state?.fullRecipe;

  

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
          {/* Favourite button */}
          <FavoriteButton 
            fullRecipe={fullRecipe} 
          />

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

          {/* Time and Servings */}
          <div className="make-recipe-meta">
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
                <h3 className="make-recipe-section-title">Your Ingredients</h3>
                <ul className="make-recipe-ingredient-list">
                  {usedIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original || ingredient.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
     
          {remainingIngredients.length > 0 && (
            <div className="make-recipe-ingredients">
              <div className="other-ingredients">
                <h3 className="make-recipe-section-title"> Pantry Ingredients</h3>
                <ul className="make-recipe-ingredient-list">
                  {remainingIngredients.map((ingredient, index) => (
                    <li key={index}>{ingredient.original}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Stack instructions and substitutions vertically */}
        <div className="make-recipe-instructions-column">
          {fullRecipe.instructions && (
            <div className="make-recipe-instructions">
              <h3 className="make-recipe-instructions-title">Instructions</h3>
              <div
                className="make-recipe-instructions-content"
                dangerouslySetInnerHTML={{ __html: fullRecipe.instructions }}
              />
            </div>
          )}

          <div className="make-recipe-helpers">
            <IngredientSubstitutions />
            <CountdownTimer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MakeRecipePage;