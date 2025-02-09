const axios = require('axios');

const currentsApi = axios.create({
    baseURL: 'https://api.currentsapi.services/v1',
    params: {
        apiKey: process.env.CURRENTS_API_KEY
    }
});

module.exports = currentsApi;
