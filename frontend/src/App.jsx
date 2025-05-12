import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import RecipesByIngredients from "./components/RecipesByIngredients";
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Router>
      <div>
        <h1 className="text-3xl font-bold text-blue-600">Welcome to Byte-to-Bite</h1>
        <Routes>
          {/* Define the home route */}
          <Route path="/" element={<RecipesByIngredients />} />
          
          {/* Define the route for recipe details */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
