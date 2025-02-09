const openai = require('../config/chatGPTApi');

class ChatGPTService {
    async processArticle(article) {

        const categoriesList = [
            "Technologies",
            "Business",
            "Science",
            "Sports",
            "Divertissement",
            "Politique",
            "Santé",
            "Éducation",
            "Mode",
            "Économie",
            "Musique",
            "Art",
            "Cinéma",
            "Littérature",
            "Histoire",
        ].join(', ');

        try {
            const prompt = `Tu dois rédiger un article mieux rédigé et plus conscit que celui fournit. 
            Analyse l'article suivant (à l'aide de la source) et génère une réponse au format JSON strict selon cette structure :
            {
                "summary": "résumé de l'actu de 90 mots environ",
                "detailedArticle": {
                    "introduction": "présentation brève du sujet et son importance (sans parler de l'article)",
                    "context": "contexte, antécédents et chiffres clés",
                    "details": "points clés de manière synthétique et factuelle",
                    "issues": "importance et impacts potentiels",
                    "conclusion": "essentiel à retenir en une phrase"
                },
                "questions: [
                    {
                        "question": "question1",
                        "answer": "réponse1"
                    },
                    {
                        "question": "question2",
                        "answer": "réponse2"
                    },
                    {
                        "question": "question3",
                        "answer": "réponse3"
                    }
                ]
                "categories": ["catégorie1", "catégorie2"]
            }

            Consignes importantes:
            1. Le résumé doit faire environ 90 mots
            2. L'article détaillé doit être rédigé de manière claire et accessible, sans jargon complexe
            3. Chaque section doit être fluide et compréhensible pour un lecteur qui ne suit pas l'actualité de près
            4. Les catégories doivent être choisies parmi la liste suivante : ${categoriesList}
            5. Les questions doivent être pertinentes par rapport à l'article
            6. Les réponses aux questions doivent être claires et précises, pas plus de 2 phrases

            Réponds uniquement avec un JSON valide, sans autre texte avant ou après.

            Article à analyser :
            Titre : ${article.title}
            Article : ${article.description}
            Source : ${article.url}`;

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                store: true,
                messages: [
                    {
                        role: "system",
                        content: "Tu es un rédacteur de presse qui rédige des articles de presse de manière concise et engageante à partir d'une source."
                    },
                    {
                        role: "user",
                        content: prompt
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
}

module.exports = new ChatGPTService();