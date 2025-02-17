import { ReadArticle } from '@/types/articles';
import { Language } from '@/types/languages';
import AsyncStorage from '@react-native-async-storage/async-storage';

const READ_ARTICLES_KEY = 'readArticles';

export const ReadArticlesService = {

    async getReadArticles(): Promise<ReadArticle[]> {
        try {
            const data = await AsyncStorage.getItem(READ_ARTICLES_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting read articles:', error);
            return [];
        }
    },

    async markAsRead(articleId: string, language: Language): Promise<void> {
        try {
            const readArticles = await this.getReadArticles();
            const newReadArticle: ReadArticle = {
                id: articleId,
                readAt: new Date().toISOString(),
                language
            };
            
            // Prevent duplicates
            const updatedArticles = [
                ...readArticles.filter(a => a.id !== articleId),
                newReadArticle
            ];
            
            await AsyncStorage.setItem(READ_ARTICLES_KEY, JSON.stringify(updatedArticles));
        } catch (error) {
            console.error('Error marking article as read:', error);
        }
    },

    async isArticleRead(articleId: string): Promise<boolean> {
        const readArticles = await this.getReadArticles();
        return readArticles.some(a => a.id === articleId);
    }
};