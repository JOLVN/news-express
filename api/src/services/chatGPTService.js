const openai = require('../config/chatGPTApi');

class ChatGPTService {
    async processArticle(article) {

        const categoriesList = [
            "Technologies",
            "Business",
            "Science",
            "Sport",
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
            "Environnement",
        ].join(', ');

        try {
            const prompt = `Tu dois rédiger un article mieux rédigé et plus conscit que celui fournit, dans la même langue que l'article en question. 
            Analyse l'article suivant (à l'aide de la source) et génère une réponse au format JSON strict selon cette structure :
            {
                "summary": "résumé de l'actu de 90 mots environ",
                "detailedArticle": {
                    "introduction": "présentation brève du sujet et son importance (sans parler de l'article)",
                    "context": "contexte de l'affaire, antécédents et chiffres clés",
                    "details": "détails et explications qui permettent de comprendre l'ensemble, doit répondre au titre de l'article",
                    "issues": "importance et impacts potentiels",
                    "conclusion": "essentiel à retenir en une phrase ou deux"
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
            3. Chaque section doit être fluide et compréhensible pour un lecteur qui ne suit pas l'actualité de près, sans être trop répétitif
            4. Les catégories doivent être choisies parmi la liste suivante : ${categoriesList}
            5. Les questions doivent être pertinentes et viennent compléter ce qui ne se trouve pas forcément dans l'article
            6. Les réponses aux questions doivent être claires et précises, pas plus de 2 phrases
            7. Tout doit être dans la même langue que l'article

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

    async chat(message, articleContent) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `Tu es un assistant helpful qui répond aux questions à propos de cet article: ${articleContent}.
                        Cherche sur internet si nécessaire.
                        Tu dois répondre dans la même langue qu'est l'article.
                        Tu ne dois pas quitter le contexte de l'article, même si tu peux donner des informations supplémentaires.
                        Tu dois répondre une réponse courte de manière claire et précise, sans jargon complexe.`
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