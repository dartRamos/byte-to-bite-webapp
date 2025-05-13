import './App.css'
import  RecipesByIngredients from "./components/RecipesByIngredients"
import RecipeModal from './components/RecipeModal';
import { useState } from 'react';

function App() {

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Welcome to Byte-to-Bite</h1>
      <br/>
      <RecipesByIngredients />
      <br />
      <br />
      

      <RecipeModal />
      
    </div>

  )
}

export default App;
