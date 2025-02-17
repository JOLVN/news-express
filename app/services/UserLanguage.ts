import { Language } from "@/types/languages";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_LANGUAGE_KEY = 'userLanguage';

type Preferences = {
    language: Language;
}

export const UserLanguageService = {

    async getUserLanguage(): Promise<Preferences | null> {
        try {
            const data = await AsyncStorage.getItem(USER_LANGUAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting user language:', error);
            return null;
        }
    },

    async setUserLanguage(language: Language): Promise<void> {
        try {
            await AsyncStorage.setItem(USER_LANGUAGE_KEY, JSON.stringify({
                language
            }));
        } catch (error) {
            console.error('Error setting user language:', error);
        }
    }

}