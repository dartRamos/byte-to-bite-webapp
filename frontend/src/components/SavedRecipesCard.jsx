import '../styling/SavedRecipesCard.css'

const SavedRecipesCard = ({savedRecipes}) => {

  return (
    <div className="saved-recipe-container">
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <div className="saved-recipes-grid">
          {savedRecipes.map(recipe => (
            <div key={recipe.recipe_id} className="recipe-card">
              <h2 className="recipe-title">{recipe.title}</h2>
              <img src={recipe.image_url} alt={recipe.title} className="recipe-image" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
};

export default SavedRecipesCard;
