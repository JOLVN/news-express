import { ArticleResponse } from "@/types/types";

const API_URL = 'https://news-express-1mmx.onrender.com/';

export async function fetchArticles(day: string) {
    const path = `news/${day}`;
    const response = await fetch(`${API_URL}${
        path
    }`);
    return response.json() as Promise<ArticleResponse>;
}