import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'userData';

export const UserIdService = {

    async getUserId(): Promise<string | null> {
        try {
            const userId = await AsyncStorage.getItem(USER_ID_KEY);
            return userId || null;
        } catch (error) {
            console.error('Error getting user id:', error);
            return null;
        }
    },

    async setUserId(userId: string): Promise<void> {
        try {
            await AsyncStorage.setItem(USER_ID_KEY, userId);
        } catch (error) {
            console.error('Error setting user id:', error);
        }
    }
};