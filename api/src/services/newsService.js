const currentsApi = require('../config/currentsApi');
const chatGPTService = require('./chatGPTService');
const firebaseService = require('../services/firebaseService');

class NewsService {

    async fetchLatestNews(language, country) {
        try {
            const response = await currentsApi.get('/latest-news', {
                params: {
                    language: language,
                    country: country
                }
            });

            const articles = response.data.news;
            const processedArticles = await this.processArticles(articles, language);

            return {
                total: processedArticles.length,
                articles: processedArticles,
            };
        } catch (error) {
            console.error('Error fetching latest news:', error);
            throw error;
        }
    }

    async processArticles(articles, language) {
        const processedArticles = [];

        for (const article of articles) {
            try {

                const exists = await firebaseService.articleExists(article.url);
                if (exists) continue;
                const processedArticle = await chatGPTService.processArticle(article, language);
                console.log(`Article processed: ${article.title}`);


                processedArticles.push({
                    id: article.id,
                    title: article.title,
                    originalDescription: article.description,
                    summary: processedArticle.summary,
                    detailedArticle: processedArticle.detailedArticle,
                    categories: processedArticle.categories,
                    questions: processedArticle.questions,
                    url: article.url,
                    author: article.author,
                    image: article.image,
                    published: article.published,
                    language: article.language,
                });

            } catch (error) {
                console.error(`Error processing article ${article.id}:`, error);
                // Continue avec l'article suivant même si un échoue
                continue;
            }
        }

        return processedArticles;
    }
}

module.exports = new NewsService();