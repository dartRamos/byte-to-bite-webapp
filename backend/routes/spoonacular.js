const express = require('express');
const router = express.Router();
const Spoonacular = require('spoonacular');
const defaultClient = Spoonacular.ApiClient.instance;
require('dotenv').config();

// Configure API key authorization: apiKeyScheme
const apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = process.env.SPOONACULAR_API_KEY; // hidden API key in .env file


router.get('/RecipesByIngredients', async (req, res) => {
  try {
    const apiInstance = new Spoonacular.RecipesApi();
    const ingredients = req.query.ingredients || ""; // Get ingredients from query parameters
    const inputIngredients = ingredients.split(',').map(ing => ing.trim().toLowerCase()); // Convert to array for comparison
    const opts = {
      number: 24, // Fetch 24 recipes
      ranking: 1, // Prioritize using more ingredients
      ignorePantry: false // Include pantry staples in the API response
    };

    apiInstance.searchRecipesByIngredients(ingredients, opts, (error, data, response) => {
      if (error) {
        console.error('Error fetching recipes by Ingredients:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
      } else {
        // Filter recipes to include at least 50% of the input ingredients
        const filteredRecipes = data
          .map(recipe => {
            const usedIngredients = recipe.usedIngredients.map(ing => ing.name.toLowerCase());
            const matchingIngredients = inputIngredients.filter(ing => usedIngredients.includes(ing));
            const matchPercentage = (matchingIngredients.length / inputIngredients.length) * 100;

            return {
              ...recipe,
              matchCount: matchingIngredients.length, // Add match count for sorting
              matchPercentage // Add match percentage for filtering
            };
          })
          .filter(recipe => recipe.matchPercentage >= 40) // Only include recipes with at least 40% match
          .sort((a, b) => b.matchCount - a.matchCount); // Sort by most matched ingredients

        console.log('Filtered and sorted recipes:', filteredRecipes);
        res.json(filteredRecipes); // Return the filtered and sorted recipes
      }
    });
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});

router.get('/recipe', async (req, res) => {
  try {
    const api = new Spoonacular.DefaultApi();
    const analyzeRecipeRequest = {
      title: "Spaghetti Carbonara",
      servings: 2,
      ingredients: [
        "1 lb spaghetti",
        "3.5 oz pancetta",
        "2 Tbsps olive oil",
        "1 egg",
        "0.5 cup parmesan cheese"
      ],
      instructions: "Bring a large pot of water to a boil and season generously with salt. Add the pasta to the water once boiling and cook until al dente. Reserve 2 cups of cooking water and drain the pasta."
    };

    const opts = {
      language: "en", // The input language, either "en" or "de".
      includeNutrition: false, // Whether nutrition data should be added to correctly parsed ingredients.
      includeTaste: false // Whether taste data should be added to correctly parsed ingredients.
    };

    api.analyzeRecipe(analyzeRecipeRequest, opts, (error, data) => {
      if (error) {
        console.error('Error analyzing recipe:', error);
        res.status(500).json({ error: 'Failed to analyze recipe' });
      } else {
        console.log('API called successfully. Returned data:', data);
        res.json(data);
      }
    });
  } catch (error) {
    console.error('Error analyzing recipe:', error.message);
    res.status(500).json({ error: 'Failed to analyze recipe' });
  }
});

module.exports = router;