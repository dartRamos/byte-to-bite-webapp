import { useState } from "react";
import axios from 'axios';
import '../styling/IngredientSubstitutions.css';

function IngredientSubstitutions() {
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

  return (
    <div className="ingredient-substitutions-container">
      <h2>Ingredient Substitutions</h2>
      <input
        type="text"
        value={ingredient}
        onChange={handleInputChange}
        placeholder="Enter ingredient"
        className="ingredient-substitutions-input"
      />
      <button
        onClick={handleFindClick}
        disabled={ingredient.trim() === ''}
        className="ingredient-substitutions-button"
      >
        Find Substitutions
      </button>
      {error && <p className="ingredient-substitutions-error">{error}</p>}
      {substitutions && substitutions.substitutes && (
        <ul className="ingredient-substitutions-list">
          {substitutions.substitutes.map((sub, idx) => (
            <li key={idx} className="ingredient-substitutions-list-item">{sub}</li>
          ))}
        </ul>
      )}
      {substitutions && !substitutions.substitutes && <p className="ingredient-substitutions-error">No substitutions found.</p>}
    </div>
  );
}

export default IngredientSubstitutions;