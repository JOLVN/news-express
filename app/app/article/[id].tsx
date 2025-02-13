import * as WebBrowser from 'expo-web-browser';
import Button from "@/components/ui/buttons/Button";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Question } from '@/types/articles';
import ArticleQuestion from '@/components/article/ArticleQuestion';
import { useContext, useState } from 'react';
import { ArticlesContext } from '@/contexts/ArticlesContext';
import ChatbotButton from '@/components/ui/buttons/ChatbotButton';

export default function ArticleDetails() {

    const { getArticleById } = useContext(ArticlesContext);
    const { id } = useLocalSearchParams();
    const article = getArticleById(id as string);
    
    const colors = useThemeColors();
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
                    <Image source={{uri: article.image}} style={{width: '100%', height: 200}} />
                    <ThemedText variant={'articleItalic'}>{article.detailedArticle.introduction}</ThemedText>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Context</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.context}</ThemedText>
                    </View>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Détails</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.details}</ThemedText>
                    </View>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Conséquences</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.issues}</ThemedText>
                    </View>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Ce qu'il faut retenir</ThemedText>
                        <ThemedText variant={'articleBody'}>{article.detailedArticle.conclusion}</ThemedText>
                    </View>
                    <Button onPress={openArticle}>
                        Consulter l'article
                    </Button>
                    <View style={styles.section}>
                        <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Q&A</ThemedText>
                    </View>
                    {article.questions.map((qa: Question, index: number) => (
                        <ArticleQuestion 
                            key={index} 
                            question={qa} 
                            isExpanded={expandedQuestionIndex === index} 
                            onToggle={() => toggleQuestion(index)} 
                        />
                    ))}
                </View>
            </ScrollView>
            <ChatbotButton style={styles.chatbotButton} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Platform.OS === 'ios' ? 30 : 20,
    },
    section: {
    },
    sectionTitle: {
        marginBottom: 10,
    },
    chatbotButton: {
        position: 'absolute',
        bottom: 50,
        right: 50,
    }
});