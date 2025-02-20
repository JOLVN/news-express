const { db } = require('../config/firebase');

class FirebaseService {
    constructor() {
        this.articlesCollection = db.collection('articles');
        this.creditsCollection = db.collection('credits');
    }

    async getCredits(userId) {
        try {
            const docRef = await this.creditsCollection.doc(userId).get();

            if (docRef.exists) {
                return docRef.data().credits;
            } else {
                // Si l'utilisateur n'existe pas, on crée un nouveau document avec 0 crédits
                await this.creditsCollection.doc(userId).set({
                    credits: 0,
                    createdAt: new Date(),
                    lastUpdated: new Date()
                });
                return 0;
            }
        } catch (error) {
            console.error('Error getting credits:', error);
            throw error;
        }
    }

    async setCredits(userId, newCredits) {
        try {
            await this.creditsCollection.doc(userId).set({
                credits: newCredits,
                lastUpdated: new Date()
            }, { merge: true });

            return true;
        } catch (error) {
            console.error('Error setting credits:', error);
            throw error;
        }
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
    async getArticlesByDate(dateString, language) {
        const snapshot = await this.articlesCollection
            .where('published', '>=', dateString)
            .where('published', '<', dateString + '\uf8ff')
            .where('language', '==', language)
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