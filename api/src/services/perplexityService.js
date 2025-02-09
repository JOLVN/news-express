const perplexityApi = require('../config/perplexityApi');



class PerplexityService {

    preparePrompt(articles) {
        return `Résume les articles suivants en environ 90 mots de manière claire et accessible, pour quelqu’un qui ne suit pas forcément l’actualité. Assure-toi que les informations essentielles soient couvertes, sans jargon compliqué. (summary)
        Et, Rédige un article structuré et clair à partir des informations suivantes :
         1️⃣ Introduction → Présente brièvement le sujet et pourquoi il est important.
        2️⃣ Contexte → Explique le contexte de l’actualité (antécédents, chiffres clés si pertinents).
        3️⃣ Détails principaux → Développe les points clés de l’article en restant synthétique et factuel.
        4️⃣ Enjeux et conséquences → Explique pourquoi cette actualité est importante et son impact potentiel.
        5️⃣ Conclusion → Résume en une phrase l’essentiel à retenir.
        L’écriture doit être fluide et facile à comprendre, même pour un lecteur qui ne suit pas l’actualité de près. Évite le jargon complexe et privilégie une formulation claire et accessible.
        Format de réponse attendu (en JSON) :
        {
            "articles": [
                {
                    "id": "1",
                    "summary": "résumé court...",
                    "detailedArticle": {
                        "introduction": "Introduction...",
                        "context": "Contexte...",
                        "details": "Détails principaux...",
                        "issues": "Enjeux et conséquences...",
                        "conclusion": "Conclusion..."
                    }
                },
                ...
            ]
        }
    
        Articles à traiter :
        ${articles.map((article, index) => `
            Article ${index + 1}:
            ID: ${index + 1}
            Titre: ${article.title}
            Description: ${article.description}
            Source: ${article.url}
            `).join('\n')}`;
    }

    async generateSummary(article) {
        const prompt = `Résume l’article suivant en environ 90 mots de manière claire et accessible, pour quelqu’un qui ne suit pas forcément l’actualité. Assure-toi que les informations essentielles soient couvertes, sans jargon compliqué.
        Titre : ${article.title}
        Article : ${article.description}
        Source : ${article.url}
        Le résumé doit aller à l’essentiel, expliquer les enjeux si nécessaire et être fluide à lire. Évite les phrases trop longues et privilégie une structure facile à comprendre.
        Fournis uniquement le texte brut du résumé sans ajout de commentaires, de balises ou d’explications supplémentaires.`;

        try {
            const response = await perplexityApi.post('/chat/completions', {
                model: 'sonar-reasoning',
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error generating summary:', error.message);
            throw error;
        }
    }

    async generateDetailedArticle(article) {
        const prompt = `Rédige un article structuré et clair à partir des informations suivantes :
        Titre : ${article.title}
        Article : ${article.description}
        Source : ${article.url}
        L’article doit être concis, informatif et accessible, avec une structure logique. Il doit être divisé en sections pertinentes :
        1️⃣ Introduction → Présente brièvement le sujet et pourquoi il est important.
        2️⃣ Contexte → Explique le contexte de l’actualité (antécédents, chiffres clés si pertinents).
        3️⃣ Détails principaux → Développe les points clés de l’article en restant synthétique et factuel.
        4️⃣ Enjeux et conséquences → Explique pourquoi cette actualité est importante et son impact potentiel.
        5️⃣ Conclusion → Résume en une phrase l’essentiel à retenir.
        L’écriture doit être fluide et facile à comprendre, même pour un lecteur qui ne suit pas l’actualité de près. Évite le jargon complexe et privilégie une formulation claire et accessible.
        Fournis uniquement le texte brut de l’article sans ajout de commentaires, de balises ou d’explications supplémentaires.`;

        try {
            const response = await perplexityApi.post('/chat/completions', {
                model: 'sonar-reasoning',
                messages: [{
                    role: 'user',
                    content: prompt
                }]
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error generating detailed article:', error.message);
            throw error;
        }
    }

    async processBatchArticles(articles) {
        const prompt = this.preparePrompt(articles);

        try {
            const response = await perplexityApi.post('/chat/completions', {
                model: 'sonar-reasoning',
                messages: [{
                    role: 'user',
                    content: prompt
                }],
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error processing batch articles:', error.message);
            throw error;
        }
    }
}

module.exports = PerplexityService;