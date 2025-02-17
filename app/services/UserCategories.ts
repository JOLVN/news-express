import { Category } from "@/types/categories";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_CATEGORIES_KEY = 'userCategories';

export const UserCategoriesService = {

    async getUserCategories(): Promise<Category[]> {
        try {
            const data = await AsyncStorage.getItem(USER_CATEGORIES_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting user categories:', error);
            return [];
        }
    },

    async setUserCategories(categories: Category[]): Promise<void> {
        try {
            await AsyncStorage.setItem(USER_CATEGORIES_KEY, JSON.stringify(categories));
        } catch (error) {
            console.error('Error setting user categories:', error);
        }
    }

}