import { Article } from "@/types/articles";
import { createContext, useState } from "react";

interface ArticlesContextProps {
    articles: Article[];
    setArticles: (articles: Article[]) => void;
    getArticleById: (id: string) => Article | undefined;
}

export const ArticlesContext = createContext<ArticlesContextProps>({
    articles: [],
    setArticles: () => {},
    getArticleById: () => undefined
});

export function ArticlesContextProvider({children}: {children: React.ReactNode}) {

    const [articles, setArticles] = useState<Article[]>([]);

    function getArticleById(id: string) {
        return articles.find(article => article.id === id);
    }

    const values = {
        articles,
        setArticles,
        getArticleById
    }

    return (
        <ArticlesContext.Provider value={values}>
            {children}
        </ArticlesContext.Provider>
    )
}