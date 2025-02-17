import { categories } from './categories.js';

export function getProcessArticlePrompt(article, language) {
    if (language === 'fr') {
        return `Rédige un article plus concis et mieux rédigé en analysant l'article donné. Génère une réponse au format JSON strict, selon la structure suivante :
            # Instructions

            1. **Résumé** : Crée un résumé d'environ 90 mots qui capture l'essentiel de l'actualité traitée.
            2. **Article détaillé** :
            - **Introduction** : Présente brièvement le sujet et son importance, sans faire référence directe à l'article.
            - **Contexte** : Explique le contexte, les antécédents, et fournit des chiffres clés relatifs à l'affaire.
            - **Détails** : Développe les détails et les explications nécessaires pour comprendre pleinement le sujet, en répondant directement au titre de l'article.
            - **Problèmes** : Discute de l'importance et des impacts potentiels de l'affaire.
            - **Conclusion** : Résume l'essentiel à retenir en une ou deux phrases.

            3. **Questions** : Formule trois questions pertinentes qui viennent enrichir la compréhension du lecteur, avec leurs réponses claires et précises, chaque réponse tenant en deux phrases maximum.
            4. **Catégories** : Sélectionne des catégories pertinentes de l'article parmi la liste fournie.

            # Structure de sortie

            Génère une réponse strictement au format JSON suivant :

            json
            {
                "summary": "Résumé de l'actu de 90 mots environ",
                "detailedArticle": {
                    "introduction": "Présentation brève du sujet et son importance.",
                    "context": "Contexte de l'affaire, antécédents et chiffres clés.",
                    "details": "Détails et explications qui permettent de comprendre l'ensemble.",
                    "issues": "Importance et impacts potentiels.",
                    "conclusion": "Essentiel à retenir en une phrase ou deux."
                },
                "questions": [
                    {
                    "question": "Question 1",
                    "answer": "Réponse 1."
                    },
                    {
                    "question": "Question 2",
                    "answer": "Réponse 2."
                    },
                    {
                    "question": "Question 3",
                    "answer": "Réponse 3."
                    }
                ],
                "categories": ["Catégorie 1", "Catégorie 2"]
            }
            

            # Notes

            - Le résumé doit obligatoirement faire environ 90 mots.
            - L'article détaillé doit être clair, fluide et adapté à un public non familier avec l'actualité.
            - Les réponses aux questions doivent enrichir l'article sans être redondantes par rapport au contenu principal.
            - Chaque article doit comporter entre 1 et 3 catégories pertinentes parmi cette liste : ${categories.join(', ')}.
            - Réponds uniquement au format JSON, sans aucun texte supplémentaire avant ou après.
            
            # Article à analyser :
            Titre : ${article.title}
            Article : ${article.description}
            Source : ${article.url}`;
    } else if (language === 'en') {
        return `Write a more concise and well-written article by analyzing the given article. Generate a response in strict JSON format, according to the following structure:
            # Instructions

            1. **Summary**: Create a summary of approximately 90 words that captures the essence of the news story.
            2. **Detailed Article**:
            - **Introduction**: Briefly introduce the topic and its importance without directly referencing the original article.
            - **Context**: Explain the background, context, and provide key figures related to the issue.
            - **Details**: Expand on details and explanations necessary to fully understand the topic, addressing the title of the article directly.
            - **Issues**: Discuss the importance and potential impacts of the issue.
            - **Conclusion**: Summarize the key takeaways in one or two sentences.

            3. **Questions**: Formulate three relevant questions that enhance the reader’s understanding, with clear and concise answers, each limited to a maximum of two sentences.
            4. **Categories**: Select relevant categories for the article from the provided list.

            # Output Structure

            Generate a response strictly in the following JSON format:

            json
            {
                "summary": "Approximately 90-word news summary",
                "detailedArticle": {
                    "introduction": "Brief introduction of the topic and its importance.",
                    "context": "Background, context, and key figures related to the issue.",
                    "details": "Details and explanations that allow comprehensive understanding.",
                    "issues": "Importance and potential impacts of the issue.",
                    "conclusion": "Key takeaways in one or two sentences."
                },
                "questions": [
                    {
                    "question": "Question 1",
                    "answer": "Answer 1."
                    },
                    {
                    "question": "Question 2",
                    "answer": "Answer 2."
                    },
                    {
                    "question": "Question 3",
                    "answer": "Answer 3."
                    }
                ],
                "categories": ["Category 1", "Category 2"]
            }

            # Notes

            - The summary must be approximately 90 words long.
            - The detailed article should be clear, fluent, and accessible to a general audience unfamiliar with the news.
            - Answers to the questions should enrich the article without repeating the main content.
            - Each article must include between 1 and 3 relevant categories from this list: ${categories.join(', ')}.
            - Respond exclusively in JSON format, without any additional text before or after.

            # Article to analyze:
            Title: ${article.title}
            Article: ${article.description}
            Source: ${article.url}`;
    }
}

export function getProcessArticleSystem(language) {
    if (language === 'fr') {
        return `Tu es un rédacteur de presse qui rédige des articles de presse de manière concise et engageante à partir d'une source. 
            Analyse bien l'article suivant et rédige un article plus concis et mieux rédigé.`;
    } else if (language === 'en') {
        return `You are a press writer who writes concise and engaging news articles based on a source. 
            Analyze the following article and write a more concise and well-written article.`;
    }
}

export function getChatSystem(articleContent, language) {
    if (language === 'fr') {
        return `Tu es un assistant helpful qui répond aux questions à propos de cet article: ${articleContent}.
            Cherche sur internet si nécessaire.
            Tu ne dois pas quitter le contexte de l'article, même si tu peux donner des informations supplémentaires.
            Tu dois répondre une réponse courte de manière claire et précise, sans jargon complexe.`
    } else if (language === 'en') {
        return `You are a helpful assistant who answers questions about this article: ${articleContent}.
            Search the internet if necessary.
            You must respond with a short answer in a clear and precise manner, without complex jargon.`
    }

}