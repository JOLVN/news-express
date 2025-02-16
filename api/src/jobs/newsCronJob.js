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
            const frenchArticles = await this.newsService.fetchLatestNews('fr', 'fr');
            console.log(`Retrieved ${frenchArticles.total} fr articles`);

            const savedCountFr = await this.firebaseService.saveArticles(frenchArticles.articles);
            console.log(`Saved ${savedCountFr} new fr articles to Firebase`);

            const englishArticles = await this.newsService.fetchLatestNews('en', 'us');
            console.log(`Retrieved ${englishArticles.total} en articles`);

            const savedCountEn = await this.firebaseService.saveArticles(englishArticles.articles);
            console.log(`Saved ${savedCountEn} new en articles to Firebase`);

            return {
                fr: frenchArticles,
                en: englishArticles,
            };
        } catch (error) {
            console.error('Error executing news job:', error);
            throw error;
        }
    }

    // Démarrer le cron job (toutes les 2 heures par défaut)
    // start(cronSchedule = '0 */2 * * *') {
    //     cron.schedule(cronSchedule, async () => {
    //         await this.executeJob();
    //     }, {
    //         scheduled: true,
    //         timezone: 'Europe/Paris',
    //         runOnInit: true
    //     });
    //     console.log('News cron job started');
    // }
}

module.exports = new NewsCronJob();