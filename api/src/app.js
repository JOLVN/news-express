require('dotenv').config();

const express = require('express');
const newsCronJob = require('./jobs/newsCronJob');

const app = express();
const port = process.env.PORT || 3000;
const { db } = require('./config/firebase');
process.removeAllListeners('warning');

// Route de test pour déclencher manuellement le job
app.get('/fetch-news', async (req, res) => {
    try {
        const articles = await newsCronJob.executeJob();
        res.json({ success: true, articles });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/news/:date', async (req, res) => {
    try {
        const dateString = req.params.date; // Format attendu: YYYY-MM-DD

        // Référence à la collection articles
        const articlesRef = db.collection('articles');

        // Requête Firestore
        const snapshot = await articlesRef
            .where('published', '>=', dateString)
            .where('published', '<', dateString + '\uf8ff')
            .orderBy('published', 'desc')
            .get();

        // Transformer les documents en tableau d'articles
        const articles = [];
        snapshot.forEach(doc => {
            articles.push({
                id: doc.id,
                ...doc.data()
            });
        });

        console.log(`Retrieved ${articles.length} articles for ${dateString}`);

        res.json({
            success: true,
            date: dateString,
            count: articles.length,
            articles: articles
        });

    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Démarrer le cron job
newsCronJob.start();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});