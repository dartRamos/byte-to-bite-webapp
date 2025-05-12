const axios = require('axios'); 
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



// Function to fetch recipes based on recipe ID
// https://spoonacular.com/food-api/docs#Get-Recipe-Information
router.get('/recipesById', async (req, res) => {
  // get the id parameter from the front end
  const recipeId = req.query.id;

  // If no ID is provided, return a 400 (Bad Request) error
  if(!recipeId) {
    return res.status(400).json({ error: 'Recipe ID is required' });
  }

  //make a request to spoonacular api with the id 
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);

    res.json(response.data);
    console.log("Recipe data:" , response.data);
  } catch (error) {
    console.error('Error fetching full recipe from Spoonacular:', error.message);
    res.status(500).json({ error: 'Failed to fetch full recipe' });

  }


})



module.exports = router;