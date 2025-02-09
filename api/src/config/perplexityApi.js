const axios = require('axios');

const perplexityApi = axios.create({
    baseURL: 'https://api.perplexity.ai',
    headers: {
        'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

module.exports = perplexityApi;