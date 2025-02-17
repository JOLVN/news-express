import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_THEME_KEY = 'themePreferences';

type Preferences = {
    theme: 'light' | 'dark';
    isSystemTheme: boolean;
}

export const UserThemeService = {

    async getUserTheme(): Promise<Preferences | null> {
        try {
            const data = await AsyncStorage.getItem(USER_THEME_KEY);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error getting user theme:', error);
            return null;
        }
    },

    async setUserTheme(preferences: Preferences): Promise<void> {
        try {
            await AsyncStorage.setItem(USER_THEME_KEY, JSON.stringify(preferences));
        } catch (error) {
            console.error('Error setting user theme:', error);
        }
    }

}