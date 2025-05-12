import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [recipeInfo, setRecipeInfo] = useState(null); // state to store recipe info

  // Function to fetch recipe info from your backend
  async function getRecipeInfo() {
    const id = '649985'; // Replace with the actual recipe ID
    try {
      // Fetch recipe instructions from your backend
      const res = await axios.get(`http://localhost:8080/recipes/${id}/info`);
      console.log("This is the response: ", res.data); // Log the response to see the instructions
      setRecipeInfo(res.data); // Store recipe data
    } catch (e) {
      console.error('Error fetching recipe info:', e);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Welcome to Byte-to-Bite</h1>
      <br />

      <button
        onClick={getRecipeInfo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Get Recipe Info
      </button>

      {/* Render the recipe information */}
      {recipeInfo && (
      <div>
        <h2 className="text-xl font-semibold mt-4">Recipe Steps:</h2>
        <ul className="mt-2">
          {recipeInfo.map((instructionSet, index) => (
            <div key={index}>
              <h3 className="font-bold">Recipe</h3>
              <ol>
                {instructionSet.steps.map((step, stepIndex) => (
                  <li key={stepIndex}>{step.step}</li>
                ))}
              </ol>
            </div>
          ))}
        </ul>
      </div>
)}
    </div>
  );
}

export default App;
