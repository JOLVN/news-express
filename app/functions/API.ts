import { Texts } from "@/constants/Texts";
import { ArticleByIdResponse, ArticleResponse } from "@/types/articles";
import { UserData } from "@/types/user";
import { Language } from "@/types/languages";
import { Alert } from "react-native";
import Constants from 'expo-constants';

const API_URL = 'https://news-express-1mmx.onrender.com/';
const API_KEY = Constants.expoConfig?.extra?.personalApiKey;

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

export async function fetchArticleById(id: string) {
    const path = `api/news/${id}?apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(`${API_URL}${path}`);
        if (!response.ok) {
            throw {
                message: 'Error while fetching article by id',
                status: response.status,
            };
        }
        return response.json() as Promise<ArticleByIdResponse>;
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

export async function fetchArticlesByIds(ids: string[]) {
    const path = `api/news?apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids }),
        });
        if (!response.ok) {
            throw {
                message: 'Error while fetching articles by ids',
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

export async function getUserDataFromFirebase(userId: string): Promise<UserData> {
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

export async function addBookmarkToFirebase(userId: string, articleId: string): Promise<boolean> {
    const path = `api/bookmarks/${userId}?apiKey=${API_KEY}`;
    
    try {        
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ articleId }),
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

export async function removeBookmarkFromFirebase(userId: string, articleId: string): Promise<boolean> {
    const path = `api/bookmarks/${userId}/${articleId}?apiKey=${API_KEY}`;
    
    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ articleId }),
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
