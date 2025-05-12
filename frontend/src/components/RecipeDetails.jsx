import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

function RecipeDetails({ recipe }) {
  const { id } = useParams();  // gets recipe id from url
  const [recipeInfo, setRecipeInfo] = useState(null); 

  useEffect(() => {
    async function getRecipeDetails() {
      try {
        
        const res = await axios.get(`http://localhost:8080/api/spoonacular/recipes/${id}/info`);
        setRecipeInfo(res.data);
        console.log(recipeInfo)
      } catch (err) {
        console.log('Error fetching recipe info:', err);
      }
    }

    getRecipeDetails();
  }, [id]);

  if (!recipeInfo) return <div>Loading...</div>; // Fake loading screen for testing

  return (
    <div className="recipe-details">
      <h2>{recipeInfo.title}</h2>
      <img src={recipeInfo.image} alt={recipeInfo.title} />
      <h3>Instructions:</h3>
      <div>
      {recipeInfo.map((instructionSet, index) => (
          <div key={index}>
            <h4></h4>
            <ol>
              {instructionSet.steps.map((step, stepIndex) => (
                <li key={stepIndex}>{step.step}</li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeDetails;
