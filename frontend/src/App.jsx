import './App.css';
import Fridge from './components/Fridge';
import Nav from './components/Nav';
import SavedRecipesPage from './components/SavedRecipesPage';
import SearchPage from './components/SearchPage';
import MakeRecipePage from './components/MakeRecipePage';
import { Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from "./context/FavoritesContext";
import AboutPage from './components/AboutPage';
import { useEffect, useState } from 'react';

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    let storedUserId = localStorage.getItem("userId");

    if (!storedUserId) {
      fetch("https://byte-to-bite-webapp.onrender.com/db/create-user", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          storedUserId = data.id;
          localStorage.setItem("userId", storedUserId);
          setUserId(storedUserId);
        })
        .catch((err) => console.error("Failed to create user", err));
    } else {
      setUserId(storedUserId);
    }
  }, []);

  return (
    <FavoritesProvider>
      <Nav />
      <Routes>
        <Route path="/" element={<Fridge userId={userId} />} />
        <Route path="/search" element={<SearchPage userId={userId} />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage userId={userId} />} />
        <Route path="/make-recipe" element={<MakeRecipePage userId={userId} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </FavoritesProvider>
  );
};

export default App;
