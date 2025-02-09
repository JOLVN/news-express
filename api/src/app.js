require('dotenv').config();

const express = require('express');
const newsCronJob = require('./jobs/newsCronJob');
const firebaseService = require('./services/firebaseService');
const chatGPTService = require('./services/chatGPTService');

const app = express();
const port = process.env.PORT || 3000;

process.removeAllListeners('warning');

// Créer une route pour executer mon cron
app.get('/run-cron', async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'] || req.query.apiKey;
        if (apiKey !== process.env.CRON_API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await newsCronJob.executeJob();
        res.status(200).json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error' });
    }
});

app.get('/news/:date', async (req, res) => {
    try {
        const dateString = req.params.date; // Format attendu: YYYY-MM-DD

        const articles = await firebaseService.getArticlesByDate(dateString);

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