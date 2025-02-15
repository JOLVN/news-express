import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const ELEVENLABS_ENDPOINT = 'https://api.elevenlabs.io/v1/text-to-speech';
const ELEVENLABS_API_KEY = process.env.EXPO_PUBLIC_ELEVENLABS_API_KEY as string;
// const VOICE_ID = '21m00Tcm4TlvDq8ikWAM';
// const VOICE_ID = 'dzKt73kkmFQQ0Qnznorl';
const VOICE_ID = '1cQMpOQhhvKQYONTiETc';

export class TTSService {
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
            // 1. Conversion du texte en audio via API
            const response = await fetch(
                `${ELEVENLABS_ENDPOINT}/${VOICE_ID}`,
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'xi-api-key': ELEVENLABS_API_KEY,
                },
                body: JSON.stringify({
                    text,
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.5,
                    }
                }),
                }
            );

            if (!response.ok) {                
                throw new Error('TTS request failed');
            }

            // 2. Obtenir le blob audio
            const audioData = await response.blob();

            // 3. Créer un fichier temporaire
            const fileUri = FileSystem.documentDirectory + 'temp_audio.mp3';
            const audioBase64 = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(audioData);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    resolve(base64data?.toString().split(',')[1]);
                };
            });

            // 4. Écrire le fichier
            await FileSystem.writeAsStringAsync(fileUri, audioBase64 as string, {
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