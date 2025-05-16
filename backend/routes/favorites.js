const express = require('express');
const router = express.Router();
const { saveRecipeForUser, removeRecipeForUser, getSavedRecipesByUserId  } = require('../db/database');

//POST REQUEST TO SAVE RECIPES TO THE DB
router.post('/save-recipe', async (req, res) => {

  try {

    // Use user_id = 1 for testing (coming from the seeds).
    // After we add authentication, replace the hardcoded 1 with the logged-in user’s ID.
    const userId = 1; 
    const savedRecipe = req.body;  // Full recipe object from frontend

    console.log('Saving recipe for user:', userId);
    console.log('Recipe data:', savedRecipe);
    
    const saved = await saveRecipeForUser(userId, savedRecipe);
    res.json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save recipe' });
  }
});

//DELETE REQUEST TO REMOVE RECIPES FROM THE DB
router.delete('/remove-recipe', async (req, res) => {
  try {
    const userId = 1; // hard coded for now 
    const { recipe_id } = req.body;
    
    // if no userId or no recipeId, error 
    if (!recipe_id || !userId) {
      return res.status(400).json({ error: 'Missing recipe_id or user_id' });
    }

    // call removeRecipeForUser function 
    const result = await removeRecipeForUser(userId, recipe_id);

    // result.rowCount comes from the result of your db.query(...) call.
    // It tells you how many rows were affected (in this case, deleted). If 0, means nothing was affected 
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Recipe not found or already removed' });
    }


    res.status(200).json({ message: 'Recipe removed successfully', removedRecipe: result.rows[0] });
  } catch (err) {
    console.error('Error removing recipe:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/saved-recipes', async (req, res) => {
  try {
    const userId = 1; // hardcoded for now
    const savedRecipes = await getSavedRecipesByUserId(userId);
    
    res.json(savedRecipes);
  } catch (err) {
    console.error('Error fetching saved recipes:', err);
    res.status(500).json({ error: 'Failed to fetch saved recipes' });
  }
});




module.exports = router;
