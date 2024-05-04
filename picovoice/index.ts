import {PicovoiceManager} from '@picovoice/picovoice-react-native';
import {RhinoInference} from '@picovoice/rhino-react-native';
import Tts from 'react-native-tts';

let picovoiceManager: PicovoiceManager;

function wakeWordCallback() {
  console.log('wake word detected');
}

function inferenceCallback(inference: RhinoInference) {
  if (inference.isUnderstood) {
    Tts.getInitStatus().then(() => {
      if (inference?.slots?.ingredient) {
        Tts.speak(`You need 50 grams of ${inference.slots.ingredient}`);
      }
    });
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
}
