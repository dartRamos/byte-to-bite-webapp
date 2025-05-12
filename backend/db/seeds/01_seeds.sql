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

INSERT INTO saved_recipes (user_id, recipe_id, title, image_url, instructions, ingredients, is_favorited)
VALUES
(
  1,
  157375,
  'Steamy Creamy Mushroom Risotto',
  'https://img.spoonacular.com/recipes/157375-312x231.jpg',
  '[
    {"step": "Heat the broth.", "timer": 5},
    {"step": "Sauté mushrooms.", "timer": 10},
    {"step": "Add rice and stir.", "timer": 5},
    {"step": "Gradually add broth.", "timer": 15},
    {"step": "Stir until creamy.", "timer": 5}
  ]',
  '[{"name": "mushrooms", "amount": 2, "unit": "cups"}, {"name": "arborio rice", "amount": 1, "unit": "cup"}, {"name": "vegetable broth", "amount": 4, "unit": "cups"}]',
  TRUE
);

INSERT INTO recipe_matches (user_id, recipe_id, match_percentage)
VALUES
(1, 157375, 80.0); -- 80% match for recipe 157375