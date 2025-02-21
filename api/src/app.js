require('dotenv').config();

const express = require('express');
const newsCronJob = require('./jobs/newsCronJob');
const firebaseService = require('./services/firebaseService');
const chatGPTService = require('./services/chatGPTService');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;

process.removeAllListeners('warning');

// Créer une route pour executer mon cron
app.get('/run-cron', async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'] || req.query.apiKey;
        if (apiKey !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await newsCronJob.executeJob();
        res.status(200).json({ message: 'OK' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Error' });
    }
});

app.post('/api/news', async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'] || req.query.apiKey;
        if (apiKey !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { ids } = req.body;
        const articles = await firebaseService.getArticlesByIds(ids);

        res.json({
            success: true,
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

app.get('/api/news/:articleId', async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'] || req.query.apiKey;
        if (apiKey !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const articleId = req.params.articleId;
        const article = await firebaseService.getArticleById(articleId);

        if (article) {
            res.json({
                success: true,
                article: article
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Article not found'
            });
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/api/news/:date/:language', async (req, res) => {
    try {
        const apiKey = req.headers['x-api-key'] || req.query.apiKey;
        if (apiKey !== process.env.API_KEY) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const dateString = req.params.date; // Format attendu: YYYY-MM-DD
        const language = req.params.language;
        const articles = await firebaseService.getArticlesByDate(dateString, language);

        console.log(`Retrieved ${articles.length} articles for ${dateString} in ${language}`);

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
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const language = req.headers['x-language'] || req.query.language;
    if (!language) {
        return res.status(400).json({ error: 'Missing language' });
    }

    const { message, articleContent } = req.body;

    if (!message || !articleContent) {
        return res.status(400).json({ error: 'Missing message or articleContent' });
    }

    try {
        const response = await chatGPTService.chat(message, articleContent, language);
        res.json({ response });
    } catch (error) {
        console.error('Error processing chat:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get user credits data
app.get('/api/credits/:userId', async (req, res) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const userId = req.params.userId;
        const credits = await firebaseService.getUserData(userId);
        res.json(credits);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get credits' });
    }
});

// Add bookmark for a user
app.post('/api/bookmarks/:userId', async (req, res) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const { articleId } = req.body;
        const userId = req.params.userId;
        const result = await firebaseService.addBookmark(userId, articleId);
        res.json({ success: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add bookmark' });
    }
});

// Remove bookmark for a user
app.delete('/api/bookmarks/:userId/:articleId', async (req, res) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const { articleId } = req.params;
        const userId = req.params.userId;
        const result = await firebaseService.removeBookmark(userId, articleId);
        res.json({ success: result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove bookmark' });
    }
});

// Update credits for a user
app.post('/api/credits/:userId', async (req, res) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const { credits } = req.body;
        const userId = req.params.userId;
        await firebaseService.setCredits(userId, credits);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update credits' });
    }
});

// Refresh credits for a user
app.post('/api/credits/:userId/refresh', async (req, res) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    if (apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const { credits, date } = req.body;
        const userId = req.params.userId;
        await firebaseService.refreshCredits(userId, date, credits);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to refresh credits' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});