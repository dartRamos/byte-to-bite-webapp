import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([]); // array of recipe IDs

  // Fetch favorites from backend on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await axios.get("https://byte-to-bite-webapp.onrender.com/db/saved-recipes");
        setFavoriteIds(res.data.map(recipe => recipe.recipe_id));
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };
    fetchFavorites();
  }, []);

  // Add favorite (and save to DB)
  const addFavorite = async (recipe) => {
    try {
      await axios.post("https://byte-to-bite-webapp.onrender.com/db/save-recipe", {
        ...recipe,
        is_favorited: true,
      });
      setFavoriteIds(prev => [...prev, recipe.id]);
    } catch (err) {
      console.error("Failed to save favorite", err);
    }
  };

  // Remove favorite (and remove from DB)
  const removeFavorite = async (recipeId) => {
    try {
      await axios.delete("https://byte-to-bite-webapp.onrender.com/db/remove-recipe", {
        data: { recipe_id: recipeId },
      });
      setFavoriteIds(prev => prev.filter(id => id !== recipeId));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
  };

  // Check if a recipe is favorited
  const isFavorited = (recipeId) => favoriteIds.includes(recipeId);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
};