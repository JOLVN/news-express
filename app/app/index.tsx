import AppLogo from "@/components/AppLogo";
import ArticleScreenImage from "@/components/article/ArticleScreenImage";
import ArticleSummaryBox from "@/components/article/ArticleSummaryBox";
import CustomDrawer from "@/components/drawer/CustomDrawer";
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import { fetchArticles } from "@/functions/API";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Article, ArticleResponse } from "@/types/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, View } from "react-native";

export default function Index() {

    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [articles, setArticles] = useState<ArticleResponse | undefined>(undefined);
    const [visibleImage, setVisibleImage] = useState<string | ''>('');
    const colors = useThemeColors();
    const today = '2025-02-11';

    async function getArticles() {
        try {
            setIsLoading(true)
            console.log('fetching articles...');
            
            const data = await fetchArticles(today);
            setArticles(data);            
            if (!visibleImage && data.articles.length > 0) {
                setVisibleImage(data.articles[0].image);
            }
            console.log(data.count);
            
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    function getCurrentArticle(index: number) {        
        if (articles) {
            console.log('changing image into:', articles.articles[index].image);
            setVisibleImage(articles.articles[index].image);
        }
        
    }

    useEffect(() => {
        getArticles();
    }, []);

    if (isLoading || !articles) {
        return <ActivityIndicator />
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>

            <CustomDrawer 
                isVisible={isDrawerVisible} 
                onClose={() => setIsDrawerVisible(false)}
            >
                <CustomDrawerContent />
            </CustomDrawer>

            <ArticleScreenImage image={visibleImage} />

            <SafeAreaView style={styles.contentContainer}>
                <AppLogo onPress={() => setIsDrawerVisible(true)} />
                <ArticleSummaryBox
                    style={styles.summaryBox}
                    articles={articles?.articles || []}
                    onArticleChange={getCurrentArticle}
                />
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
    summaryBox: {
        position: 'absolute',
        bottom: 40,
    },
    
});
