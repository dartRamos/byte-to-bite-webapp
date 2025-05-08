const express = require('express');
const router = express.Router();
var Spoonacular = require('spoonacular');
var defaultClient = Spoonacular.ApiClient.instance;
// Configure API key authorization: apiKeyScheme
var apiKeyScheme = defaultClient.authentications['apiKeyScheme'];
require('dotenv').config();
apiKeyScheme.apiKey = process.env.SPOONACULAR_API_KEY;

router.get('/randomRecipe', async (req, res) => {
  try {
    let apiInstance = new Spoonacular.RecipesApi();
    let opts = {
      'includeNutrition': false, // Boolean | Include nutrition data in the recipe information. Nutrition data is per serving. If you want the nutrition data for the entire recipe, just multiply by the number of servings.
      // 'includeTags': "vegetarian,gluten", // String | A comma-separated list of tags that the random recipe(s) must adhere to.
      // 'excludeTags': "meat,dairy", // String | A comma-separated list of tags that the random recipe(s) must not adhere to.
      'number': 10 // Number | The maximum number of items to return (between 1 and 100). Defaults to 10.
    };
    apiInstance.getRandomRecipes(opts, (error, data, response) => {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        res.json(data);
      }
    });
  } catch (error) {
    console.error('Error fetching recipe:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});


router.get('/recipe', async (req, res) => {
  try {
    var api = new Spoonacular.DefaultApi()
    var analyzeRecipeRequest = {"title":"Spaghetti Carbonara","servings":2,"ingredients":["1 lb spaghetti","3.5 oz pancetta","2 Tbsps olive oil","1  egg","0.5 cup parmesan cheese"],"instructions":"Bring a large pot of water to a boil and season generously with salt. Add the pasta to the water once boiling and cook until al dente. Reserve 2 cups of cooking water and drain the pasta. "}; // {AnalyzeRecipeRequest} Example request body.
    var opts = {
      'language': "en", // {String} The input language, either \"en\" or \"de\".
      'includeNutrition': false, // {Boolean} Whether nutrition data should be added to correctly parsed ingredients.
      'includeTaste': false // {Boolean} Whether taste data should be added to correctly parsed ingredients.
    };
    var callback = function(error, data, response) {
      if (error) {
        console.error(error);
      } else {
        console.log('API called successfully. Returned data: ' + data);
        res.json(data);
      }
    };
    api.analyzeRecipe(analyzeRecipeRequest, opts, callback);
  } catch (error) {
    console.error('Error fetching recipe:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipe' });
  }
});

module.exports = router;