import { useEffect, useState } from "react";
import axios from 'axios';
import '../App.css'

function RandomRecipe() {
  const [recipe, setRecipe] = useState();

  async function getRandomRecipe() {
    try {
      // Call the backendpoint
      const response = await axios.get('http://localhost:8080/api/spoonacular/randomRecipe');
      setRecipe(response.data.recipes[0]); // Update State with recipe data 

    } catch(error) {
      console.error('Error fetching recipe:', error); 
    }
  }
  useEffect(() => {
    getRandomRecipe();
  }, []);
  
  return (
  
    <div className="row">
  
      <button onClick={getRandomRecipe}>
        Generate Random Button
      </button>
  
      <div>
        Name:
        <a target="_blank" href={recipe?.sourceUrl}>
          {recipe?.title}
        </a>
      </div>
      <img src={recipe?.image} />
  
      <div className="ingredients">
        <div>
          Ingredients Needed:
        </div>
        {recipe?.extendedIngredients.map((ingredient, index) =>
          <span key={index}>
  
            {index !== recipe?.extendedIngredients.length - 1 ? ingredient.name + ", " : ingredient.name}
          </span>
        )}
        {recipe?.analyzedInstructions.map((instruction) =>
          <ol>
            {instruction.steps?.map((step) =>
              <li>
                {step.step}
              </li>
            )}
          </ol>
        )
        } 
      </div>
      <div>
  
  
      </div>
    </div>
  )
}

export default RandomRecipe;
