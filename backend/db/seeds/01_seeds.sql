-- Insert users
INSERT INTO users (created_at)
VALUES
  ('2025-05-08 14:30:00');

-- Insert user_ingredients
INSERT INTO user_ingredients (user_id, ingredient_name, is_pantry_staple)
VALUES
  (1, 'chicken', FALSE),
  (1, 'rice', FALSE),
  (1, 'salt', TRUE),
  (1, 'pepper', TRUE);

INSERT INTO saved_recipes (user_id, recipe_id, title, image_url, is_favorited)
VALUES
(
  1,
  157375,
  'Steamy Creamy Mushroom Risotto',
  'https://img.spoonacular.com/recipes/157375-312x231.jpg',
  TRUE
);