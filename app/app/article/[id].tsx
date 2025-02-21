import * as WebBrowser from 'expo-web-browser';
import Button from "@/components/ui/buttons/Button";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link, useLocalSearchParams } from "expo-router";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Article, Question } from '@/types/articles';
import ArticleQuestion from '@/components/article/ArticleQuestion';
import { useContext, useEffect, useState } from 'react';
import { ArticlesContext } from '@/contexts/ArticlesContext';
import ChatbotButton from '@/components/ui/buttons/ChatbotButton';
import { Texts } from '@/constants/Texts';
import { LanguageContext } from '@/contexts/LanguageContext';
import { fetchArticleById } from '@/functions/API';
import SkeletonArticle from '@/components/ui/skeletons/SkeletonArticle';

export default function ArticleDetails() {

    const { getArticleById } = useContext(ArticlesContext);
    const { id } = useLocalSearchParams();
    
    const [article, setArticle] = useState<Article | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const [expandedQuestionIndex, setExpandedQuestionIndex] = useState<number | null>(null);

    function toggleQuestion(index: number) {
        setExpandedQuestionIndex(index === expandedQuestionIndex ? null : index);
    }

    const openArticle = async () => {
        if (!article) return;
        try {
            await WebBrowser.openBrowserAsync(article.url);
        } catch (error) {
            console.error('Erreur lors de l\'ouverture du lien:', error);
        }
    };

    async function getArticle() {
        const article = getArticleById(id as string);
        if (article) {
            setArticle(article);
        } else {
            try {
                setIsLoading(true);
                const article = await fetchArticleById(id as string);
                setArticle(article.article);
            } catch (error) {
                console.error('Error while fetching article by id:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }


    useEffect(() => {
        getArticle();
    }, [id])

    if (isLoading) {
        return (
            <SkeletonArticle />
        )
    }

    if (!article) {
        return (
            <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
                <ThemedText variant={'articleTitle'}>Article introuvable</ThemedText>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.coloredBackground }}>
            <ScrollView style={[styles.container]}>
                <View style={{ gap: 30, paddingBottom: 40 }}>
                    <ThemedText variant={'articleTitle'}>{article.title}</ThemedText>
                    {article.image && article.image !== 'None' && (
                        <Image source={{uri: article.image}} style={{width: '100%', height: 200}} />
                    )}
                    <ThemedText variant={'articleItalic'}>{article.detailedArticle.introduction}</ThemedText>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>{Texts[language].context}</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.context}</ThemedText>
                    </View>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>{Texts[language].details}</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.details}</ThemedText>
                    </View>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>{Texts[language].issues}</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.issues}</ThemedText>
                    </View>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>{Texts[language].conclusion}</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.conclusion}</ThemedText>
                    </View>
                    <Button onPress={openArticle}>
                        {Texts[language].openArticle}
                    </Button>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>{Texts[language].qAndA}</ThemedText>
                    </View>
                    <View style={styles.questions}>
                        {article.questions.map((qa: Question, index: number) => (
                            <ArticleQuestion 
                                key={index} 
                                question={qa} 
                                isExpanded={expandedQuestionIndex === index} 
                                onToggle={() => toggleQuestion(index)} 
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <Link href={{ pathname: '/chatbot/[id]', params: {id: article.id }}} asChild>
                <ChatbotButton style={styles.chatbotButton} />
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    section: {
    },
    sectionTitle: {
        marginBottom: 10,
    },
    questions: {
        gap: 10
    },
    chatbotButton: {
        position: 'absolute',
        bottom: 50,
        right: 50,
    }
});