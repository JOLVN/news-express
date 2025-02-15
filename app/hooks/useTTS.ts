import { useState } from 'react';
import { TTSService } from '@/services/TTS';

export const useTTS = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const speak = async (text: string) => {
        try {
            setError(null);
            setIsPlaying(true);
            await TTSService.speak(text);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsPlaying(false);
        }
    };

    const stop = async () => {
        try {
            await TTSService.stop();
            setIsPlaying(false);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return { speak, stop, isPlaying, error };
};