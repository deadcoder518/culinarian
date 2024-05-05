import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';

interface RecipeState {
  ingredients: any[];
  instructions: any[];
  currentInstructionIndex: number;
}

const initialState: RecipeState = {
  ingredients: [],
  instructions: [],
  currentInstructionIndex: 0,
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    initialiseRecipe: (state, action: PayloadAction<any>) => {
      state.ingredients = action.payload.ingredients;
      state.instructions = action.payload.instructions;
      state.currentInstructionIndex = 0;
    },
    removeRecipe: state => {
      state.ingredients = [];
      state.instructions = [];
      state.currentInstructionIndex = 0;
    },
    incrementCurrentInstructionIndex: state => {
      if (state.currentInstructionIndex < state.instructions.length - 1) {
        state.currentInstructionIndex += 1;
      }
    },
    decrementCurrentInstructionIndex: state => {
      if (state.currentInstructionIndex > 0) {
        state.currentInstructionIndex -= 1;
      }
    },
  },
});

export const {
  initialiseRecipe,
  removeRecipe,
  incrementCurrentInstructionIndex,
  decrementCurrentInstructionIndex,
} = recipeSlice.actions;

export const getRecipeInstructions = (state: RootState) =>
  state.recipe.instructions;

export const getRecipeIngredients = (state: RootState) =>
  state.recipe.ingredients;

export const getRecipeCurrentInstructionIndex = (state: RootState) =>
  state.recipe.currentInstructionIndex;

export default recipeSlice.reducer;
