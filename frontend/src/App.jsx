import './App.css'
import  RecipesByIngredients from "./components/RecipesByIngredients"
import Fridge from './components/Fridge'
import Nav from './components/Nav'
import SearchPage from './components/SearchPage'

const App = () => {
  return (
    <>
      <Nav />
      <Fridge />
      <SearchPage/>
    
    </>
  )
}

export default App;