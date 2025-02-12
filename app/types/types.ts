interface ArticleDetails {
    introduction: string;
    context: string;
    details: string;
    issue: string;
    conclusion: string;
}

export interface Question {
    question: string;
    answer: string;
}

export interface Article {
    id: number;
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