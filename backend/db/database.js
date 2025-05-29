require('dotenv').config({ path: '../.env' });

// PG database client/database setup
const { Pool } = require('pg');

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
};

const db = new Pool(dbParams);

db.query('SELECT NOW()')
  .then(res => {
    console.log('Database connection test successful:', res.rows);
  })
  .catch(err => {
    console.error('Database connection error:', err.message);
  });

  // User
  const createUser = async function(user) {
    try {
    
      const result = await db.query( 
        `INSERT INTO users (created_at) VALUES ($1) RETURNING *`,
        [user.created_at]
      );
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  };

  const getUserById = async (userId) => {
    try {
      
      const result = await db.query(
        'SELECT * FROM users WHERE id = $1',
        [userId]
      );
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  };


  // User Ingredients
  const addUserIngredient = async function(userId, user_ingredient) {
    try {

      const result = await db.query(
        `INSERT INTO user_ingredients (user_id, ingredient_name, is_pantry_staple) VALUES ($1, $2, $3) RETURNING *`,
        [userId, user_ingredient.ingredient_name, user_ingredient.is_pantry_staple]
      );
      return result.rows[0];
    } catch (err) {
      throw err
    }
  };
  
  const getUserIngredientsByUserId = async (userId) => {
    try {

      const result = await db.query(
        `SELECT * FROM user_ingredients WHERE user_id = $1`,
        [userId]
      );
      return result.rows;
    } catch (err) {
      throw err
    }
  };


  // Save Recipes
  const saveRecipeForUser = async function(userId, saved_recipe) {
    
    try {
      const result = await db.query(
        `INSERT INTO saved_recipes (user_id, recipe_id, title, image_url, is_favorited) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [userId, saved_recipe.id, saved_recipe.title, saved_recipe.image,  saved_recipe.is_favorited]
      );
      return result.rows[0];
    } catch (err) {
      throw err;
    }
  }

  // remove recipes
  const removeRecipeForUser = async (userId, recipeId) => {
  const queryText = 'DELETE FROM saved_recipes WHERE recipe_id = $1 AND user_id = $2 RETURNING *';
  try {
    const result = await db.query(queryText, [recipeId, userId]);
    return result;
  } catch (err) {
    throw err;
  }
};

  const getSavedRecipesByUserId = async (userId) => {
    try {

      const result = await db.query(
        `SELECT * FROM saved_recipes WHERE user_id = $1`,
        [userId]
      );
      return result.rows;
    } catch (err) {
      throw err;
    }
  };

module.exports = {createUser, getUserById, addUserIngredient, getUserIngredientsByUserId, saveRecipeForUser, getSavedRecipesByUserId, removeRecipeForUser};

