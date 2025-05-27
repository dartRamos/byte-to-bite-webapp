import { useState } from "react";
import axios from 'axios';
import '../styling/IngredientSubstitutions.css';

function IngredientSubstitutions({ isOpen, onClose }) {
  const [ingredient, setIngredient] = useState('');
  const [substitutions, setSubstitutions] = useState(null);
  const [error, setError] = useState(null);

  async function getSubstitutions(ingredient) {
    try {
      const response = await axios.get('http://localhost:8080/api/spoonacular/IngredientSubstitutions', {
        params: { ingredient }
      });
      setSubstitutions(response.data);
      setError(null);
    } catch (error) {
      setSubstitutions(null);
      setError('Error fetching substitutions.');
      console.error('Error fetching subs:', error);
    }
  }

  function handleInputChange(e) {
    setIngredient(e.target.value);
  }

  function handleFindClick() {
    if (ingredient.trim() !== '') {
      getSubstitutions(ingredient);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="substitutions-modal-overlay">
      <div className="substitutions-modal-content">
        <button className="substitutions-modal-close" onClick={onClose}>&times;</button>
        <h2>Ingredient Substitutions</h2>
        <input
          type="text"
          value={ingredient}
          onChange={handleInputChange}
          placeholder="Enter ingredient"
          className="substitutions-modal-input"
        />
        <button
          onClick={handleFindClick}
          disabled={ingredient.trim() === ''}
          className="substitutions-modal-button"
        >
          Find Substitutions
        </button>
        {error && <p className="substitutions-modal-error">{error}</p>}
        {substitutions && substitutions.substitutes && (
          <ul className="substitutions-modal-list">
            {substitutions.substitutes.map((sub, idx) => (
              <li key={idx} className="substitutions-modal-list-item">{sub}</li>
            ))}
          </ul>
        )}
        {substitutions && !substitutions.substitutes && <p className="substitutions-modal-error">No substitutions found.</p>}
      </div>
    </div>
  );
}

export default IngredientSubstitutions;