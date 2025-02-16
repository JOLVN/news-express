import { ArticleResponse } from "@/types/articles";

const API_URL = 'https://news-express-1mmx.onrender.com/';
const API_KEY = process.env.EXPO_PUBLIC_PERSONAL_API_KEY;

export async function fetchArticles(day: string) {
    const path = `news/${day}?apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(`${API_URL}${
            path
        }`);
        if (!response.ok) {
            throw {
                message: 'Error while fetching articles',
                status: response.status,
            };
        }
        return response.json() as Promise<ArticleResponse>;
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

export async function getChatbotResponse(articleUrl: string, question: string): Promise<string> {
    const path = `api/chat?apiKey=${API_KEY}`;
    try {
        const response = await fetch(`${API_URL}${path}`, {
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