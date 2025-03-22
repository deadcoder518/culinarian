import {PicovoiceManager} from '@picovoice/picovoice-react-native';
import {RhinoInference} from '@picovoice/rhino-react-native';
import Tts from 'react-native-tts';
import {
  decrementCurrentInstructionIndex,
  getRecipeCurrentInstructionIndex,
  getRecipeIngredients,
  getRecipeInstructions,
  incrementCurrentInstructionIndex,
  removeRecipe,
} from '../store/recipe/recipeSlice';
import {store} from '../store';
import stringSimilarity from 'string-similarity-js';
import {ToWords} from 'to-words';

let picovoiceManager: PicovoiceManager;

function echoInstruction() {
  const state = store.getState();
  const currentInstructionIndex = getRecipeCurrentInstructionIndex(state);
  const instructions = getRecipeInstructions(state);
  const currentInstruction = instructions[currentInstructionIndex];
  console.log(currentInstruction);
  try {
    Tts.getInitStatus().then(() => {
      Tts.speak(currentInstruction);
    });
  } catch (e) {
    console.log(e);
  }
}

function echoIngredient(ingredientToBeLookedFor: any) {
  const state = store.getState();
  const ingredients = getRecipeIngredients(state);
  console.log(ingredients);
  ingredients.forEach(ingredient => {
    if (stringSimilarity(ingredientToBeLookedFor, ingredient.name) >= 0.8) {
      Tts.getInitStatus().then(() => {
        const toWords = new ToWords();
        Tts.speak(
          `You need ${toWords.convert(ingredient.amount)} ${ingredient.unit} ${
            ingredient.name
          }`,
        );
      });
    }
  });
}

function wakeWordCallback() {
  console.log('wake word detected');
}

function inferenceCallback(inference: RhinoInference) {
  if (inference.isUnderstood) {
    if (inference.intent === 'current_instruction') {
      echoInstruction();
    } else if (inference.intent === 'next_instruction') {
      store.dispatch(incrementCurrentInstructionIndex());
      echoInstruction();
    } else if (inference.intent === 'previous_instruction') {
      store.dispatch(decrementCurrentInstructionIndex());
      echoInstruction();
    } else if (inference.intent === 'check_ingredient') {
      console.log(inference);
      echoIngredient(inference?.slots?.ingredient);
    }
  } else {
    console.debug('intent not understood');
  }
}

export async function createAndStartPicovoice() {
  try {
    picovoiceManager = await PicovoiceManager.create(
      process.env.PICOVOICE_ACCESS_KEY!,
      process.env.PICOVOICE_KEYWORD_PATH!,
      wakeWordCallback,
      process.env.PICOVOICE_CONTEXT_PATH!,
      inferenceCallback,
    );

    await picovoiceManager.start();
  } catch (e) {
    console.debug(e);
  }
}

export async function stopAndDeletePicovoice() {
  await picovoiceManager.stop();
  await picovoiceManager.delete();
  store.dispatch(removeRecipe());
}
