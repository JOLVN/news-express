import { useState } from 'react';
import { GoogleTTSService } from '@/services/GoogleTTS';
import { Language } from '@/types/languages';

export const useGoogleTTS = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const speak = async (text: string, language: Language) => {        
        try {
            setError(null);
            setIsPlaying(true);
            await GoogleTTSService.speak(text, language);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsPlaying(false);
        }
    };

    const stop = async () => {
        try {
            await GoogleTTSService.stop();
            setIsPlaying(false);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { speak, stop, isPlaying, error };
};