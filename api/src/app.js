require('dotenv').config();

const express = require('express');
const newsCronJob = require('./jobs/newsCronJob');

const app = express();
const port = process.env.PORT || 3000;
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

// Démarrer le cron job
newsCronJob.start();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});