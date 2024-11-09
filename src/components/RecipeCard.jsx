import React from 'react';

const RecipeCard = ({ recipe, toggleFavorite, isFavorite }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition relative">
      <button
        onClick={() => toggleFavorite(recipe)}
        className={`absolute top-2 right-2 p-2 rounded-full transition ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-red-300'}`}
      >
        ❤️
      </button>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-40 sm:h-64 object-cover rounded-lg"
        loading="lazy"
      />
      <h3 className="text-lg font-semibold mt-4 text-indigo-700">{recipe.strMeal}</h3>
    </div>
  );
};

export default RecipeCard;
