import React, {useRef} from "react";
import { X } from 'lucide-react';
import '../styling/RecipeModal.css'
import FavouriteButton from "./FavouriteButton";

const RecipeModal = ({onClose, fullRecipe}) => {

  // useRef is a React Hook that gives you a way to access and persist a DOM element or a value across renders without triggering a re-render.
  const contentRef = useRef();  // Ref to the modal content div

  // Handler to close the modal if clicking outside the modal content
  const handleOverlayClick = (e) => {
    // If the click target is outside the modal content, close it
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      
      {/* Modal content box */}
      <div className="modal-content" ref={contentRef}>

        {/* Favourite button */}
        <FavouriteButton />


        {/* Close button */}
        <button 
          onClick={onClose} 
          className="modal-close-btn">
          <X size={40}/>
        </button>
  
        {/* Title */}
        <h1 className=" font-extrabold text-center mb-4 pt-12">{fullRecipe.title}</h1>

        {/* Image */}
        {fullRecipe.image && (
          <img 
            src={fullRecipe.image} 
            alt={fullRecipe.title} 
            className="w-full max-h-64 object-cover rounded-lg mb-4"/>
        )}

        {/* Time and Servings */}
        <div className="text-center text-gray-700 mb-4">
          <p><strong>Ready in:</strong> {fullRecipe.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {fullRecipe.servings}</p>
        </div>

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
        {/* Render HTML-formatted instructions from the API using dangerouslySetInnerHTML (instructions may include HTML tags) */} 
        {fullRecipe.instructions && (
          <div>
            <h3 className="text-2xl font-semibold mb-2">Instructions</h3>
            
            <div
              className="text-base leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{ __html: fullRecipe.instructions }}
            >
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default RecipeModal;
