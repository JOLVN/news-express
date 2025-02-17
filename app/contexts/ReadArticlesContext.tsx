import { createContext, useContext, useState, useEffect } from 'react';
import { ReadArticlesService } from '@/services/ReadArticles';
import { ReadArticle } from '@/types/articles';
import { Language } from '@/types/languages';

interface ReadArticlesContextProps {
    readArticles: ReadArticle[];
    markArticleAsRead: (articleId: string, language: Language) => Promise<void>;
    isArticleRead: (articleId: string) => boolean;
};

export const ReadArticlesContext = createContext<ReadArticlesContextProps>({
    readArticles: [],
    markArticleAsRead: async () => {},
    isArticleRead: () => false
});

type Props = {
    children: React.ReactNode;
}

export function ReadArticlesContextProvider({ children }: Props) {
    const [readArticles, setReadArticles] = useState<ReadArticle[]>([]);

    useEffect(() => {
        loadReadArticles();
    }, []);

    const loadReadArticles = async () => {
        const articles = await ReadArticlesService.getReadArticles();
        setReadArticles(articles);
    };

    const markArticleAsRead = async (articleId: string, language: Language) => {
        await ReadArticlesService.markAsRead(articleId, language);
        await loadReadArticles();
    };

    const isArticleRead = (articleId: string) => {
        return readArticles.some(a => a.id === articleId);
    };

    const values = {
        readArticles,
        markArticleAsRead,
        isArticleRead
    }

    return (
        <ReadArticlesContext.Provider value={values}>
            {children}
        </ReadArticlesContext.Provider>
    );
};
