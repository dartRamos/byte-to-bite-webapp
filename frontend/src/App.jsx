import './App.css';
import Fridge from './components/Fridge';
import Nav from './components/Nav';
import SavedRecipesPage from './components/SavedRecipesPage';

import SearchPage from './components/SearchPage';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Nav />

      {/* <SearchPage /> */}

      
      <Routes>
        <Route path="/" element={<Fridge />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
      </Routes>
      
    </>
  );
};

export default App;