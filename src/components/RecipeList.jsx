import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, toggleFavorite, favorites }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes && recipes.length > 0
        ? recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.some((fav) => fav.idMeal === recipe.idMeal)}
            />
          ))
        : <p className="text-center col-span-full text-gray-500">No recipes found. Try searching for something else.</p>}
    </div>
  );
};

export default RecipeList;
