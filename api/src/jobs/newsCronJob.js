const cron = require('node-cron');
const NewsService = require('../services/newsService');

class NewsCronJob {
    constructor() {
        this.newsService = NewsService;
    }

    // Fonction pour exécuter immédiatement le job (pour les tests)
    async executeJob() {
        try {
            console.log('Fetching news...');
            const articles = await this.newsService.fetchLatestNews();
            console.log(`Retrieved ${articles.total} articles`);
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
            timezone: 'Europe/Paris'
        });
        console.log('News cron job started');
    }
}

module.exports = new NewsCronJob();