import { Article } from "@/types/articles";
import { Category } from "@/types/categories";
import { createContext, useState } from "react";

interface ArticlesContextProps {
    articles: Article[];
    userArticles: Article[];
    setArticles: (articles: Article[]) => void;
    setUserArticlesByCategories: (categories: Category[], articles: Article[]) => void;
    getArticleById: (id: string) => Article | undefined;
}

export const ArticlesContext = createContext<ArticlesContextProps>({
    articles: [],
    userArticles: [],
    setArticles: () => {},
    setUserArticlesByCategories: () => {},
    getArticleById: () => undefined
});

export function ArticlesContextProvider({children}: {children: React.ReactNode}) {

    const [articles, setArticles] = useState<Article[]>([]);
    const [userArticles, setUserArticles] = useState<Article[]>([]);

    function setUserArticlesByCategories(cats: Category[], arts: Article[]) {
        const categories = cats.map(cat => cat.label);
        const a = arts.filter(article => article.categories.some(category => categories.includes(category)));
        
        const ua = a.map(article => {
            const userArticle = userArticles.find(ua => ua.id === article.id);
            if (userArticle) {
                return userArticle;
            }
            return article;
        });
        
        setUserArticles(ua);
    }

    function getArticleById(id: string) {
        return articles.find(article => article.id === id);
    }

    const values = {
        articles,
        setArticles,
        userArticles,
        setUserArticlesByCategories,
        getArticleById
    }

    return (
        <ArticlesContext.Provider value={values}>
            {children}
        </ArticlesContext.Provider>
    )
}