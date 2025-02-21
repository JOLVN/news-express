import { createContext, useState, useEffect } from 'react';
import { BookmarksService } from '@/services/Bookmarks';

interface BookmarksContextProps {
    bookmarks: string[];
    bookmarkArticle: (articleId: string) => Promise<void>;
    unbookmarkArticle: (articleId: string) => Promise<void>;
    isArticleBookmarked: (articleId: string) => boolean;
};

export const BookmarksContext = createContext<BookmarksContextProps>({
    bookmarks: [],
    bookmarkArticle: async () => {},
    unbookmarkArticle: async () => {},
    isArticleBookmarked: () => false
});

type Props = {
    children: React.ReactNode;
}

export function BookmarksContextProvider({ children }: Props) {
    const [bookmarks, setBookmarks] = useState<string[]>([]);

    useEffect(() => {
        loadBookmarks();
    }, []);

    const loadBookmarks = async () => {
        const bookmarks = await BookmarksService.getBookmarksArticleIds();
        setBookmarks(bookmarks);
    };

    const bookmarkArticle = async (articleId: string) => {
        await BookmarksService.bookmarkArticle(articleId);
        await loadBookmarks();
    };

    const unbookmarkArticle = async (articleId: string) => {
        await BookmarksService.unbookmarkArticle(articleId);
        await loadBookmarks();
    }

    const isArticleBookmarked = (articleId: string) => {
        return bookmarks.includes(articleId);
    };

    const values = {
        bookmarks,
        bookmarkArticle,
        unbookmarkArticle,
        isArticleBookmarked
    }

    return (
        <BookmarksContext.Provider value={values}>
            {children}
        </BookmarksContext.Provider>
    );
};
