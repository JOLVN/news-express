const { db } = require('../config/firebase');

class FirebaseService {
    constructor() {
        this.articlesCollection = db.collection('articles');
    }

    // Vérifier si un article existe déjà
    async articleExists(articleUrl) {
        const snapshot = await this.articlesCollection
            .where('url', '==', articleUrl)
            .limit(1)
            .get();
        return !snapshot.empty;
    }

    // Sauvegarder un nouvel article
    async saveArticle(article) {
        try {
            const exists = await this.articleExists(article.url);
            if (!exists) {
                await this.articlesCollection.add({
                    ...article,
                    createdAt: new Date()
                });
                console.log(`Article saved: ${article.title}`);
                return true;
            }
            console.log(`Article already exists: ${article.title}`);
            return false;
        } catch (error) {
            console.error('Error saving article:', error);
            throw error;
        }
    }

    // Sauvegarder plusieurs articles
    async saveArticles(articles) {
        const savePromises = articles.map(article => this.saveArticle(article));
        const results = await Promise.all(savePromises);
        return results.filter(result => result).length; // Nombre d'articles sauvegardés
    }
}

module.exports = new FirebaseService();