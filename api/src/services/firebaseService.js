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
            await this.articlesCollection.add({
                ...article,
                createdAt: new Date()
            });
            console.log(`Article saved: ${article.title}`);
            return true;
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

    // Récupérer les articles publiés à partir d'une date donnée
    async getArticlesByDate(dateString) {
        const snapshot = await this.articlesCollection
            .where('published', '>=', dateString)
            .where('published', '<', dateString + '\uf8ff')
            .orderBy('published', 'desc')
            .get();

        const articles = [];
        snapshot.forEach(doc => {
            articles.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return articles;
    }
}

module.exports = new FirebaseService();