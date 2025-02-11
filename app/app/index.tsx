import AppLogo from "@/components/AppLogo";
import ArticleScreenImage from "@/components/article/ArticleScreenImage";
import CustomDrawer from "@/components/drawer/CustomDrawer";
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import { fetchArticles } from "@/functions/API";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Article, ArticleResponse } from "@/types/types";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [articles, setArticles] = useState<ArticleResponse | undefined>(undefined);
    const [visibleArticle, setVisibleArticle] = useState<Article | undefined>(undefined);
    const colors = useThemeColors();
    const today = '2025-02-10';

    async function getArticles() {
        try {
            console.log('fetching articles...');
            
            const data = await fetchArticles(today);
            setArticles(data);
            setVisibleArticle(data.articles[0]);
            console.log(data);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>

            <CustomDrawer 
                isVisible={isDrawerVisible} 
                onClose={() => setIsDrawerVisible(false)}
            >
                <CustomDrawerContent />
            </CustomDrawer>

            <ArticleScreenImage image={visibleArticle?.image} />

            <SafeAreaView style={styles.contentContainer}>
                <AppLogo onPress={() => setIsDrawerVisible(true)} />
            </SafeAreaView>

            {/* <Link href={{ pathname: '/article/[id]', params: {id: 1} }} asChild>
                <Pressable>
                <Text>Go to article 1</Text>
                </Pressable>
            </Link> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    
});
