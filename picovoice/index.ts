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
  picovoiceManager = await PicovoiceManager.create(
    process.env.PICOVOICE_ACCESS_KEY!,
    'Hey-Chef_en_android_v3_0_0.ppn',
    wakeWordCallback,
    'Cooking-Mode_en_android_v3_0_0.rhn',
    inferenceCallback,
  );

  await picovoiceManager.start();
}

export async function stopAndDeletePicovoice() {
  await picovoiceManager.stop();
  await picovoiceManager.delete();
}
