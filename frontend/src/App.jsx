import './App.css'
import  RecipesByIngredients from "./components/RecipesByIngredients"

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Welcome to Byte-to-Bite</h1>
      <br/>
      <RecipesByIngredients />
    </div>

  )
}

export default App