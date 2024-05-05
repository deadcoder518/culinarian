import {configureStore} from '@reduxjs/toolkit';
import recipeSlice from './recipe/recipeSlice';

export const store = configureStore({
  reducer: {
    recipe: recipeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
