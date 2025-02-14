import { ArticleResponse } from "@/types/articles";

const API_URL = 'https://news-express-1mmx.onrender.com/';

export async function fetchArticles(day: string) {
    const path = `news/${day}`;
    const response = await fetch(`${API_URL}${
        path
    }`);
    return response.json() as Promise<ArticleResponse>;
}

export async function getChatbotResponse(articleUrl: string, question: string): Promise<string> {
    try {
        const response = await fetch(`${API_URL}api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                articleContent: articleUrl,
                message: question,
            }),
    });
  
        if (!response.ok) {
            throw {
                message: 'Error while fetching chatbot response',
                status: response.status,
            };
        }
    
        const data = await response.json();
        return data.response;

    } catch (error) {
        if (error instanceof Error) {
            throw {
                message: error.message,
                status: 500,
            };
        }
        throw error;
    }
}