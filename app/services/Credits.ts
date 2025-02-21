import AsyncStorage from '@react-native-async-storage/async-storage';

const CREDITS_KEY = 'credits';

export const CreditsService = {

    async getCredits(): Promise<number | null> {
        try {
            const credits = await AsyncStorage.getItem(CREDITS_KEY);
            return credits ? Number(credits) : null;
        } catch (error) {
            console.error('Error getting credits:', error);
            return null;
        }
    },

    async setCredits(credits: number): Promise<void> {
        try {
            await AsyncStorage.setItem(CREDITS_KEY, String(credits));
        } catch (error) {
            console.error('Error setting credits:', error);
        }
    }
};