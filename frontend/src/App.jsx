import './App.css'
import  RecipesByIngredients from "./components/RecipesByIngredients"
import Fridge from './components/Fridge'
import Nav from './components/Nav'

const App = () => {
  return (
    <>
      <Nav />
      <Fridge />
    </>
  )
}

export default App;