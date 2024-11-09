import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { setIngredient, setExcludeIngredients, setRecipes, setLoading, setListening, toggleFavorite } from './features/recipes/recipesSlice';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.recipes);

  const fetchRecipes = async (ingredient) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ingredient}`);
      const filteredRecipes = response.data.meals.filter((recipe) =>
        state.excludeIngredients.every((exIng) => !recipe.strMeal.includes(exIng)) &&
        (!state.filter ||
          (state.filter === 'Quick' && recipe.strTags.includes('Quick')) ||
          (state.filter === 'Healthy' && recipe.strTags.includes('Healthy')))
      );
      dispatch(setRecipes(filteredRecipes));
      dispatch(setLoading(false));
    } catch (error) {
      console.error('Error fetching data from API', error);
      dispatch(setLoading(false));
    }
  };

  const debouncedFetchRecipes = useCallback(
    debounce((ingredient) => fetchRecipes(ingredient), 1000),
    [state.excludeIngredients, state.filter]
  );

  const handleInputChange = (e) => {
    const ingredient = e.target.value;
    dispatch(setIngredient(ingredient));
    debouncedFetchRecipes(ingredient);
  };

  const handleExcludeIngredient = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      dispatch(setExcludeIngredients([...state.excludeIngredients, e.target.value]));
      e.target.value = '';
    }
  };

  const removeIngredient = (index) => {
    const updatedExcludeIngredients = state.excludeIngredients.filter((_, i) => i !== index);
    dispatch(setExcludeIngredients(updatedExcludeIngredients));
  };

  const handleMicClick = () => {
    dispatch(setListening(true));
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      dispatch(setIngredient(transcript));
      debouncedFetchRecipes(transcript);
      dispatch(setListening(false));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      dispatch(setListening(false));
    };

    recognition.onend = () => dispatch(setListening(false));
  };

  const toggleFavoriteRecipe = (recipe) => {
    dispatch(toggleFavorite(recipe));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-indigo-100 text-gray-900 p-5">
      <h1 className="text-4xl md:text-5xl font-semibold text-center mb-6 text-indigo-600">Taylor's Recipe Finder</h1>
      <SearchBar
        ingredient={state.ingredient}
        handleInputChange={handleInputChange}
        handleMicClick={handleMicClick}
        listening={state.listening}
      />
      {state.loading && <div className="flex justify-center mb-8"><p className="text-xl text-indigo-600">Loading...</p></div>}
      <RecipeList
        recipes={state.recipes}
        toggleFavorite={toggleFavoriteRecipe}
        favorites={state.favorites}
      />
      {state.favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-600 mb-4">Favorite Recipes</h2>
          <RecipeList recipes={state.favorites} toggleFavorite={toggleFavoriteRecipe} favorites={state.favorites} />
        </div>
      )}
    </div>
  );
}

export default App;
