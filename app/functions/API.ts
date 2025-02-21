import { Texts } from "@/constants/Texts";
import { ArticleResponse } from "@/types/articles";
import { CreditsResponse } from "@/types/credits";
import { Language } from "@/types/languages";
import { Alert } from "react-native";

const API_URL = 'https://news-express-1mmx.onrender.com/';
const API_KEY = process.env.EXPO_PUBLIC_PERSONAL_API_KEY;

export async function fetchArticles(day: string, language: Language) {

    const path = `api/news/${day}/${language}?apiKey=${API_KEY}`;

    try {
        const response = await fetch(`${API_URL}${
            path
        }`);
        if (!response.ok) {
            Alert.alert(Texts[language].error, Texts[language].errorFetchingArticles);
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

export async function getChatbotResponse(articleUrl: string, question: string, language: Language): Promise<string> {
    const path = `api/chat?apiKey=${API_KEY}&language=${language}`;
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
            Alert.alert(Texts[language].error, Texts[language].errorFetchingChatbotResponse);
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

export async function getCreditsFromFirebase(userId: string): Promise<CreditsResponse> {
    const path = `api/credits/${userId}?apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(`${API_URL}${path}`);
        const data = await response.json();
        return data;
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

export async function setCreditsInFirebase(userId: string, credits: number): Promise<boolean> {
    const path = `api/credits/${userId}?apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credits }),
        });
        
        const data = await response.json();
        return data.success;
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

export async function refreshCreditsInFirebase(userId: string, date: string, credits: number): Promise<boolean> {
    const path = `api/credits/${userId}/refresh?apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ credits, date }),
        });
        
        const data = await response.json();
        return data.success;
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
