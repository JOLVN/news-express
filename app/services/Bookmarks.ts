import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarks';

export const BookmarksService = {

    async getBookmarksArticleIds(): Promise<string[]> {
        try {
            const data = await AsyncStorage.getItem(BOOKMARKS_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error getting read articles:', error);
            return [];
        }
    },

    async bookmarkArticle(articleId: string): Promise<void> {
        try {
            const bookmarksArticleIds = await this.getBookmarksArticleIds();
            
            // Prevent duplicates
            const updatesBookmarks = [
                ...bookmarksArticleIds.filter(baId => baId !== articleId),
                articleId
            ];
            
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatesBookmarks));
        } catch (error) {
            console.error('Error marking article as read:', error);
        }
    },

    async unbookmarkArticle(articleId: string): Promise<void> {
        try {
            const bookmarksArticleIds = await this.getBookmarksArticleIds();
            const updatesBookmarks = bookmarksArticleIds.filter(baId => baId !== articleId);
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatesBookmarks));
        } catch (error) {
            console.error('Error unmarking article as read:', error);
        }
    }
};