import { Language } from "./languages";

interface ArticleDetails {
    introduction: string;
    context: string;
    details: string;
    issues: string;
    conclusion: string;
}

export interface Question {
    question: string;
    answer: string;
}

export interface Article {
    id: string;
    title: string;
    originalDescription: string;
    summary: string;
    detailedArticle: ArticleDetails;
    categories: string[];
    questions: Question[];
    url: string;
    author: string;
    image: string;
    published: string;
}

export interface ArticleResponse {
    date: string;
    count: number,
    articles: Article[];
}

export interface ArticleByIdResponse {
    article: Article;
}

export interface ReadArticle {
    id: string;
    readAt: string;
    language: Language;
}