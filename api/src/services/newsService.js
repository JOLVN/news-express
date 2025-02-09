const currentsApi = require('../config/currentsApi');
const chatGPTService = require('./chatGPTService');
const firebaseService = require('../services/firebaseService');

class NewsService {

    async fetchLatestNews() {
        try {
            const response = await currentsApi.get('/latest-news', {
                params: {
                    language: 'fr',
                    country: 'fr'
                }
            });

            const articles = [response.data.news[0], response.data.news[1], response.data.news[2], response.data.news[3], response.data.news[4]];
            const processedArticles = await this.processArticles(articles);

            return {
                total: processedArticles.length,
                articles: processedArticles,
            };
        } catch (error) {
            console.error('Error fetching latest news:', error);
            throw error;
        }
    }

    async processArticles(articles) {
        const processedArticles = [];

        for (const article of articles) {
            try {

                const exists = await firebaseService.articleExists(article.url);
                if (exists) continue;
                const processedArticle = await chatGPTService.processArticle(article);
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