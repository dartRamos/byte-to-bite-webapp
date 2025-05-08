import './App.css'
import RandomRecipe from "./components/RandomRecipe"

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Welcome to Byte-to-Bite</h1>
      <br/>
      <RandomRecipe />
    </div>

  )
}

export default App