import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const GOOGLE_TTS_ENDPOINT = 'https://texttospeech.googleapis.com/v1/text:synthesize';
const GOOGLE_VOICE = 'fr-FR-Studio-A';
const GOOGLE_TTS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_TTS_API_KEY;

export class GoogleTTSService {
  static sound: Audio.Sound | null = null;

  static async initialize() {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true,
      shouldDuckAndroid: true,
    });
  }

  static async speak(text: string) {
    try {
      // 1. Conversion du texte en audio via API Google
      const response = await fetch(
        `${GOOGLE_TTS_ENDPOINT}?key=${GOOGLE_TTS_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: { text },
            voice: {
              languageCode: 'fr-FR',
              name: GOOGLE_VOICE,
            },
            audioConfig: {
              audioEncoding: 'MP3',
              pitch: 0,
              speakingRate: 1,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('TTS request failed');
      }

      // 2. Obtenir la réponse audio en base64
      const jsonResponse = await response.json();
      const audioContent = jsonResponse.audioContent; // Déjà en base64

      // 3. Créer un fichier temporaire
      const fileUri = FileSystem.documentDirectory + 'temp_audio.mp3';

      // 4. Écrire le fichier
      await FileSystem.writeAsStringAsync(fileUri, audioContent, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // 5. Arrêter l'audio précédent s'il existe
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // 6. Charger et jouer le nouveau son
      const { sound } = await Audio.Sound.createAsync(
        { uri: fileUri },
        { shouldPlay: true }
      );

      this.sound = sound;

      // 7. Attendre la fin de la lecture
      await new Promise((resolve, reject) => {
        this.sound?.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded && status.didJustFinish) {
            await this.sound?.unloadAsync();
            this.sound = null;
            resolve(null);
          }
        });
      });

    } catch (error) {
      console.error('TTS Error:', error);
      throw error;
    }
  }

  static async stop() {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.error('Stop Error:', error);
      throw error;
    }
  }
}
