import { createContext, useContext, useState } from 'react';
import { BookmarksService } from '@/services/Bookmarks';
import { addBookmarkToFirebase, removeBookmarkFromFirebase } from '@/functions/API';
import { UserDataContext } from '@/contexts/UserDataContext';

interface BookmarksContextProps {
    bookmarks: string[];
    setBookmarks: (bookmarks: string[]) => void;
    bookmarkArticle: (articleId: string) => Promise<void>;
    unbookmarkArticle: (articleId: string) => Promise<void>;
    isArticleBookmarked: (articleId: string) => boolean;
};

export const BookmarksContext = createContext<BookmarksContextProps>({
    bookmarks: [],
    setBookmarks: () => {},
    bookmarkArticle: async () => {},
    unbookmarkArticle: async () => {},
    isArticleBookmarked: () => false
});

type Props = {
    children: React.ReactNode;
}

export function BookmarksContextProvider({ children }: Props) {
    const [bookmarks, setBookmarks] = useState<string[]>([]);
    const { userId } = useContext(UserDataContext);

    const loadBookmarks = async () => {
        const bookmarks = await BookmarksService.getBookmarksArticleIds();
        if (bookmarks) setBookmarks(bookmarks);
    };

    const bookmarkArticle = async (articleId: string) => {
        await BookmarksService.bookmarkArticle(articleId);
        await loadBookmarks();        
        await addBookmarkToFirebase(userId, articleId);
    };

    const unbookmarkArticle = async (articleId: string) => {
        await BookmarksService.unbookmarkArticle(articleId);
        await loadBookmarks();
        await removeBookmarkFromFirebase(userId, articleId);
    }

    const isArticleBookmarked = (articleId: string) => {
        return bookmarks.includes(articleId);
    };

    const values = {
        bookmarks,
        setBookmarks,
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
