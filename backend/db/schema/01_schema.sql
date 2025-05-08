-- CONSIDER USING POSTGRES-MIGRATIONS LIBRARY 
-- https://www.npmjs.com/package/postgres-migrations


DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_ingredients CASCADE;
DROP TABLE IF EXISTS saved_recipes CASCADE;
DROP TABLE IF EXISTS recipe_matches CASCADE;
-- CREATE TABLES FROM ERD 

CREATE TABLE users (    -- To save user session for saved recipes/pantry
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP  -- Will be used for when we add a real login
);

CREATE TABLE user_ingredients ( -- Ingredients used for search
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  ingredient_name TEXT NOT NULL
)

CREATE TABLE saved_recipes ( -- To save favorited recipe ID from API 
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER NOT NULL,
  title TEXT NOT NULL, -- To display title of recipe on app
  image_url TEXT NOT NULL, -- To display recipe image on app
  instructions JSONB, -- To save instructions + cook timers
  ingredients JSONB, -- To save ingredients + measurements
  is_favorited BOOLEAN DEFAULT FALSE -- To decide if recipe is saved to DB
);

CREATE TABLE recipe_matches ( -- Used to check the recipe ingredient match %
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  recipe_id INTEGER NOT NULL,
  match_percentage FLOAT -- Stores match % of recipe in order to make list from highest match to lowest
)