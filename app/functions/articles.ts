import { Article, ReadArticle } from "@/types/articles";

export function sortArticles(articles: Article[], readArticles: ReadArticle[]): Article[] {
    return [...articles].sort((a, b) => {
        const isARead = readArticles.some(ra => ra.id === a.id);
        const isBRead = readArticles.some(ra => ra.id === b.id);
        
        if (isARead === isBRead) return 0;
        return isARead ? 1 : -1;
    });
}