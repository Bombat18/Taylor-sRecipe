import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredient: '',
  excludeIngredients: [],
  recipes: [],
  loading: false,
  listening: false,
  filter: '',
  favorites: JSON.parse(localStorage.getItem('favorites')) || []
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    setExcludeIngredients: (state, action) => {
      state.excludeIngredients = action.payload;
    },
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setListening: (state, action) => {
      state.listening = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleFavorite: (state, action) => {
      const recipe = action.payload;
      if (state.favorites.some(fav => fav.idMeal === recipe.idMeal)) {
        state.favorites = state.favorites.filter(fav => fav.idMeal !== recipe.idMeal);
      } else {
        state.favorites.push(recipe);
      }
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const {
  setIngredient,
  setExcludeIngredients,
  setRecipes,
  setLoading,
  setListening,
  setFilter,
  toggleFavorite
} = recipesSlice.actions;

export default recipesSlice.reducer;
