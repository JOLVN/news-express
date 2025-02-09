require('dotenv').config();

const express = require('express');
const newsCronJob = require('./jobs/newsCronJob');
const chatGPTService = require('./chatGPTService');

const app = express();
const port = process.env.PORT || 3000;
const { db } = require('./config/firebase');

process.removeAllListeners('warning');

// Créer une route pour executer mon cron
app.get('/run-cron', async (req, res) => {
    try {
        await newsCronJob.executeJob();
        const apiKey = req.headers['x-api-key'] || req.query.apiKey;
        if (apiKey !== process.env.CRON_API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        res.status(200).json({ message: 'Cron executed successfully' });
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

app.post('/api/chat', async (req, res) => {
    const { message, articleContent } = req.body;

    if (!message || !articleContent) {
        return res.status(400).json({ error: 'Missing message or articleContent' });
    }

    try {
        const response = await chatGPTService.chat(message, articleContent);
        res.json({ response });
    } catch (error) {
        console.error('Error processing chat:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});