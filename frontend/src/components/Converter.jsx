import { useState } from "react";
import Select from 'react-select';
import axios from 'axios';
import "../styling/Converter.css"

const unitOptions = [
  { value: 'grams', label: 'Grams' },
  { value: 'kilograms', label: 'Kilograms' },
  { value: 'milligrams', label: 'Milligrams' },
  { value: 'ounces', label: 'Ounces' },
  { value: 'pounds', label: 'Pounds' },
  { value: 'cups', label: 'Cups' },
  { value: 'tablespoons', label: 'Tablespoons' },
  { value: 'teaspoons', label: 'Teaspoons' },
  { value: 'litres', label: 'Litres' },
  { value: 'millilitres', label: 'Millilitres' },
  { value: 'fluid_ounces', label: 'Fluid Ounces' },
];

// Add isOpen and onClose props for modal control
function Converter({ isOpen, onClose }) {
  const [ingredientName, setIngredientName] = useState('');
  const [sourceAmount, setSourceAmount] = useState('');
  const [sourceUnit, setSourceUnit] = useState('');
  const [targetUnit, setTargetUnit] = useState('');
  const [result, setResult] = useState(null);

  async function getConversions(e) {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/api/spoonacular/Converter', {
        params: { 
          ingredientName, 
          sourceAmount, 
          sourceUnit, 
          targetUnit 
        }
      });
      setResult(response.data);
    } catch (error) {
      console.error('Conversion error:', error);
      setResult({ error: 'Error Converting Selections' });
    }
  }

  if (!isOpen) return null;

  return (
    <div className="converter-modal-overlay">
      <div className="converter-modal-content">
        <button className="converter-modal-close" onClick={onClose}>&times;</button>
        <h2 className="converter-title">Measurement Converter</h2>
        <form className="converter-input" onSubmit={getConversions}>
          <input
            className="converter-ingredient-input"
            type="text"
            placeholder="Ingredient Name"
            value={ingredientName}
            onChange={e => setIngredientName(e.target.value)}
            required
          />
          <div className="converter-row">
            <input
              className="converter-number-input"
              type="number"
              placeholder="#"
              value={sourceAmount}
              onChange={e => setSourceAmount(e.target.value)}
              required
            />
            <span className="of-label">of</span>
            <Select
              classNamePrefix="react-select"
              options={unitOptions}
              placeholder="Current Unit"
              value={unitOptions.find(option => option.value === sourceUnit)}
              onChange={option => setSourceUnit(option ? option.value : '')}
              isClearable
            />
          </div>
          <Select
            classNamePrefix="react-select"
            options={unitOptions}
            placeholder=" To New Unit"
            value={unitOptions.find(option => option.value === targetUnit)}
            onChange={option => setTargetUnit(option ? option.value : '')}
            isClearable
          />
          <button className="converter-btn" type="submit">Convert</button>
        </form>
        {result && (
          <div>
            {result.error ? (
              <p style={{color: 'red'}}>{result.error}</p>
            ) : (
              <div className="converter-result">
                <p>
                  {result.sourceAmount} {result.sourceUnit} of {result.ingredientName} is approximately {result.targetAmount} {result.targetUnit}.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Converter;