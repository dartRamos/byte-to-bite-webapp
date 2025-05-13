import React from "react";
import { X } from 'lucide-react';

// POSITION STICKY FOR THE X BUTTON 
// BACKGROUND BLUR 
// WEIRD TAGS FIGURE OUT 

const RecipeModal = ({onClose, fullRecipe}) => {

  return (
    <div className="fixed inset-0 bg-blue-900 bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-lg relative"> 

        {/* Close button */}
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black z-10"><X size={30}/></button>
  
        {/* Title */}
        <h1 className=" font-extrabold text-center mb-4 pt-12">{fullRecipe.title}</h1>

        {/* Image */}
        {fullRecipe.image && (
          <img 
            src={fullRecipe.image} 
            alt={fullRecipe.title} 
            className="w-full max-h-64 object-cover rounded-lg mb-4"/>
        )}

        {/* Ingredients */}
        {fullRecipe.extendedIngredients?.length > 0 && (
          <div className="mb-6">
            <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
            <ul className="list-disc list-inside space-y-1">
              {fullRecipe.extendedIngredients.map((ingredient, index) => (
                <li key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Instructions */}
        {fullRecipe.instructions && (
          <div>
            <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
            <p className="whitespace-pre-line">{fullRecipe.instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeModal;


