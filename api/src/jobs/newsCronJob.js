const cron = require('node-cron');
const NewsService = require('../services/newsService');
const FirebaseService = require('../services/firebaseService');

class NewsCronJob {
    constructor() {
        this.newsService = NewsService;
        this.firebaseService = FirebaseService;
    }

    // Fonction pour exécuter immédiatement le job (pour les tests)
    async executeJob() {
        try {
            console.log('Fetching news...');
            const articles = await this.newsService.fetchLatestNews();
            console.log(`Retrieved ${articles.total} articles`);

            const savedCount = await this.firebaseService.saveArticles(articles.articles);
            console.log(`Saved ${savedCount} new articles to Firebase`);

            return articles;
        } catch (error) {
            console.error('Error executing news job:', error);
            throw error;
        }
    }

    // Démarrer le cron job (toutes les 2 heures par défaut)
    start(cronSchedule = '0 */2 * * *') {
        cron.schedule(cronSchedule, async () => {
            await this.executeJob();
        }, {
            scheduled: true,
            timezone: 'Europe/Paris',
            // runOnInit: true
        });
        console.log('News cron job started');
    }
}

module.exports = new NewsCronJob();