const openai = require('../config/chatGPTApi');
const { getProcessArticlePrompt, getProcessArticleSystem, getChatSystem } = require('../data/prompts');

class ChatGPTService {
    async processArticle(article, language) {

        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                store: true,
                messages: [
                    {
                        role: "system",
                        content: getProcessArticleSystem(language)
                    },
                    {
                        role: "user",
                        content: getProcessArticlePrompt(article, language)
                    }
                ],
                max_tokens: 1500,
                temperature: 0.7,
                response_format: { type: "json_object" }
            });

            return JSON.parse(response.choices[0].message.content);
        } catch (error) {
            console.error('Error summarizing article:', error);
            throw error;
        }
    }

    async chat(message, articleContent, language) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: getChatSystem(articleContent, language)
                    },
                    {
                        role: "user",
                        content: message
                    }
                ],
            });

            return completion.choices[0].message.content;
        } catch (error) {
            console.error('OpenAI Error:', error);
            throw error;
        }
    }
}

module.exports = new ChatGPTService();