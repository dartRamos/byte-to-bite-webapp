import React, { useRef } from "react";
import { X } from 'lucide-react';
import '../styling/RecipeModal.css'

const RecipeModal = ({onClose, fullRecipe}) => {
  const contentRef = useRef();

  const handleOverlayClick = (e) => {
    if (contentRef.current && !contentRef.current.contains(e.target)) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="recipe-modal-content" ref={contentRef}>
        {/* Close button */}
        <button 
          onClick={onClose} 
          className="modal-close-btn">
          <X size={40}/>
        </button>

        {/* Title */}
        <h1 className="modal-recipe-title">{fullRecipe.title}</h1>

        {/* Image */}
        {fullRecipe.image && (
          <img 
            src={fullRecipe.image} 
            alt={fullRecipe.title} 
            className="modal-image"
          />
        )}

        {/* Time and Servings */}
        <div className="modal-body-text">
          <p><strong>Ready in:</strong> {fullRecipe.readyInMinutes} minutes</p>
          <p><strong>Servings:</strong> {fullRecipe.servings}</p>
        </div>

        {/* Ingredients */}
        {fullRecipe.extendedIngredients?.length > 0 && (
          <div>
            <h3 className="modal-section-header">Ingredients:</h3>
            <ul className="modal-ingredient-list">
              {fullRecipe.extendedIngredients.map((ingredient, index) => (
                <li className="modal-ingredient-text" key={index}>{ingredient.original}</li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default RecipeModal;
