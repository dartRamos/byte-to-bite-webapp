// RecipeImages.jsx
import React from 'react';

function RecipeImages({ recipes, positions }) {
  return (
    <>
      {recipes.map((recipe, index) => {
        const pos = positions[index] || { top: '0%', left: '0%' };

        return (
          <img
            key={recipe.recipe_id}
            src={recipe.image_url}
            alt={recipe.title}
            style={{
              position: 'absolute',
              width: '5vw',
              height: 'auto',
              top: pos.top,
              left: pos.left,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              pointerEvents: 'auto',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </>
  );
}

export default RecipeImages;
