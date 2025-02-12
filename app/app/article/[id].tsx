import Button from "@/components/ui/Button";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { Image, Platform, ScrollView, StyleSheet, Text, View } from "react-native";

export default function ArticleDetails() {

    const { id, article } = useLocalSearchParams();
    const colors = useThemeColors();

    const articleData = article ? JSON.parse(article as string) : null;

    if (!articleData) {
        return (
            <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
                <ThemedText variant={'articleTitle'}>Article introuvable</ThemedText>
            </View>
        )
    }

    return (
        <ScrollView style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
            <View style={{ gap: 30, paddingBottom: 30 }}>
                <ThemedText variant={'articleTitle'}>{articleData.title}</ThemedText>
                <Image source={{uri: articleData.image}} style={{width: '100%', height: 200}} />
                <ThemedText variant={'articleItalic'}>{articleData.detailedArticle.introduction}</ThemedText>
                <View style={styles.section}>
                    <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Context</ThemedText>
                    <ThemedText variant={'articleBody'}>{articleData.detailedArticle.context}</ThemedText>
                </View>
                <View style={styles.section}>
                    <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Détails</ThemedText>
                    <ThemedText variant={'articleBody'}>{articleData.detailedArticle.details}</ThemedText>
                </View>
                <View style={styles.section}>
                    <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Conséquences</ThemedText>
                    <ThemedText variant={'articleBody'}>{articleData.detailedArticle.issues}</ThemedText>
                </View>
                <View style={styles.section}>
                    <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Ce qu'il faut retenir</ThemedText>
                    <ThemedText variant={'articleBody'}>{articleData.detailedArticle.conclusion}</ThemedText>
                </View>
                <Button onPress={() => {}}>
                    Consulter l'article
                </Button>
                <View style={styles.section}>
                    <ThemedText variant={'articleTitle'} style={styles.sectionTitle}>Q&A</ThemedText>
                </View>
            </View>
        </ScrollView>
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
    }
});