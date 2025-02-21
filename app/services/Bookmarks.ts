import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarks';

export const BookmarksService = {

    async getBookmarksArticleIds(): Promise<string[] | null> {
        try {
            const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
            return bookmarks ? JSON.parse(bookmarks) : null;
        } catch (error) {
            console.error('Error getting read articles:', error);
            return [];
        }
    },

    async setBookmarksArticleIds(bookmarks: string[]): Promise<void> {
        try {
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
        } catch (error) {
            console.error('Error setting read articles:', error);
        }
    },

    async bookmarkArticle(articleId: string): Promise<void> {
        try {
            const bookmarksArticleIds = await this.getBookmarksArticleIds();
            
            // Prevent duplicates
            if (bookmarksArticleIds && bookmarksArticleIds.includes(articleId)) {
                return;
            }
            
            const updatesBookmarks = [...(bookmarksArticleIds || []), articleId];
            
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatesBookmarks));
        } catch (error) {
            console.error('Error marking article as read:', error);
        }
    },

    async unbookmarkArticle(articleId: string): Promise<void> {
        try {
            const bookmarksArticleIds = await this.getBookmarksArticleIds();
            const updatesBookmarks = bookmarksArticleIds?.filter((id) => id !== articleId) || [];
            await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatesBookmarks));
        } catch (error) {
            console.error('Error unmarking article as read:', error);
        }
    }
};