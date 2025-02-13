import AppLogo from "@/components/AppLogo";
import ArticleScreenImage from "@/components/article/ArticleScreenImage";
import ArticleSummaryBox from "@/components/article/ArticleSummaryBox";
import CustomDrawer from "@/components/drawer/CustomDrawer";
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import SafeArea from "@/components/SafeArea";
import { ArticlesContext } from "@/contexts/ArticlesContext";
import { CategoriesContext } from "@/contexts/CategoriesContext";
import { fetchArticles } from "@/functions/API";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {

    const [articleIndex, setArticleIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const {articles, userArticles, setArticles, setUserArticlesByCategories} = useContext(ArticlesContext);
    const {userCategories} = useContext(CategoriesContext);
    const [visibleImage, setVisibleImage] = useState<string | ''>('');
    const colors = useThemeColors();
    const today = '2025-02-12';

    async function getArticles() {
        try {
            setIsLoading(true)
            console.log('fetching articles...');
            
            const data = await fetchArticles(today);
            setArticles(data.articles);
            setUserArticlesByCategories(userCategories, data.articles);
            
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

    useEffect(() => {
        getArticles();
    }, []);

    useEffect(() => {
        if (userCategories) {
            setUserArticlesByCategories(userCategories, articles);
        }
    }, [userCategories]);

    useEffect(() => {
        if (userArticles.length > 0 && userArticles[articleIndex]) {
            setVisibleImage(userArticles[articleIndex].image);
        }
    }, [userArticles, articleIndex]);

    // TODO: Add loading screen
    if (isLoading || !userArticles) {
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

            <SafeArea style={styles.contentContainer}>
                <AppLogo onPress={() => setIsDrawerVisible(true)} />
                <ArticleSummaryBox
                    style={styles.summaryBox}
                    articles={userArticles}
                    onArticleChange={(index) => setArticleIndex(index)}
                />
            </SafeArea>

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
