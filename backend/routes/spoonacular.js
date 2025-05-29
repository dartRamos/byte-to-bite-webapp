const axios = require('axios'); 
const express = require('express');
const router = express.Router();
const Spoonacular = require('spoonacular');
const defaultClient = Spoonacular.ApiClient.instance;
require('dotenv').config();

// Configure API key authorization: apiKeyScheme
const apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
apiKeyScheme.apiKey = process.env.SPOONACULAR_API_KEY; // hidden API key in .env file




// Route for the Ingredient Search form 
router.get('/RecipesByIngredients', async (req, res) => {
  try {
    const apiInstance = new Spoonacular.RecipesApi();
    const ingredients = req.query.ingredients || ""; 
    const opts = {
      number: 24, // Fetch 24 recipes
      ranking: 1, // Prioritize using more ingredients
      ignorePantry: true // Include pantry staples in the API response
    };

    apiInstance.searchRecipesByIngredients(ingredients, opts, (error, data, response) => {
      if (error) {
        console.error('Error fetching recipes by Ingredients:', error);
        res.status(500).json({ error: 'Failed to fetch recipes' });
      } else {
        res.json(data); // Directly return the API response
      }
    });
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
});





// Router to fetch recipes based on recipe ID
// https://spoonacular.com/food-api/docs#Get-Recipe-Information
router.get('/recipesById', async (req, res) => {
  // get the id parameter from the request URL
  const recipeId = req.query.id;

  // If no ID is provided, return a 400 (Bad Request) error
  if(!recipeId) {
    return res.status(400).json({ error: 'Recipe ID is required' });
  }

  //make a request to spoonacular api with the provided id 
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`);


    // Send the full recipe data back to the frontend
    res.json(response.data);
    // console.log("Recipe data:" , response.data);
  } catch (error) {
    console.error('Error fetching full recipe from Spoonacular:', error.message);
    res.status(500).json({ error: 'Failed to fetch full recipe' });
  }
})
  




// Route to get recipe info by ID
router.get('/recipes/:id/info', async (req, res) => {
  const recipeId = req.params.id;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`, {
      params: { apiKey }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe info:', error);
    res.status(500).json({ error: 'Failed to fetch recipe info' });
  }
})





// Route to get ingredient substitutions by string
router.get('/IngredientSubstitutions', async (req, res) => {
  const ingredientName = req.query.ingredient;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  if (!ingredientName) {
    return res.status(400).json({ error: 'Ingredient name is required' });
  }

  try {
    const response = await axios.get('https://api.spoonacular.com/food/ingredients/substitutes', {
      params: {
        ingredientName,
        apiKey
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching ingredient substitutions:', error.message);
    res.status(500).json({ error: 'Failed to fetch ingredient substitutions' });
  }
});




// Route to get metric conversions
router.get('/Converter', async (req, res) => {
  const ingredientName = req.query.ingredientName || req.query.ingredient;
  const sourceAmount = parseFloat(req.query.sourceAmount || req.query.amount);
  const sourceUnit = req.query.sourceUnit || req.query.unit;
  const targetUnit = req.query.targetUnit || req.query.target;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  // Validate all required parameters
  if (!ingredientName || isNaN(sourceAmount) || !sourceUnit || !targetUnit) {
    return res.status(400).json({ 
      error: 'ingredientName, sourceAmount, sourceUnit, and targetUnit are required' 
    });
  }

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/convert', {
      params: {
        ingredientName,
        sourceAmount,
        sourceUnit,
        targetUnit,
        apiKey
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error converting:', error.message);
    res.status(500).json({ error: 'Failed to convert' });
  }
});





// Route to get Recipe Nutrition Label
router.get('/NutritionLabel/:id', async (req, res) => {
  const recipeId = req.params.id;
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const {
    defaultCss = true,
    showOptionalNutrients = false,
    showZeroValues = false,
    showIngredients = false
  } = req.query;

  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/nutritionLabel`, {
      params: {
        apiKey,
        defaultCss,
        showOptionalNutrients,
        showZeroValues,
        showIngredients
      },
      responseType: 'text' // HTML is returned as text
    });

    res.set('Content-Type', 'text/html');
    res.send(response.data);
  } catch (error) {
    console.error('Error fetching Nutrition Label', error.message);
    res.status(500).json({ error: 'Failed to fetch Nutrition Label' });
  }
})


module.exports = router