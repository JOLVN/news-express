import AppLogo from "@/components/AppLogo";
import ArticleScreenImage from "@/components/article/ArticleScreenImage";
import ArticleSummaryBox from "@/components/article/ArticleSummaryBox";
import DateCarousel from "@/components/DateCarousel";
import CustomDrawer from "@/components/drawer/CustomDrawer";
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import EdgeDetector from "@/components/EdgeDetector";
import LoadingArticlesOverlay from "@/components/LoadingArticlesOverlay";
import SafeArea from "@/components/SafeArea";
import { ArticlesContext } from "@/contexts/ArticlesContext";
import { CategoriesContext } from "@/contexts/CategoriesContext";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ReadArticlesContext } from "@/contexts/ReadArticlesContext";
import { fetchArticles } from "@/functions/API";
import { sortArticles } from "@/functions/articles";
import { formatDate } from "@/functions/date";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {

    const [articleIndex, setArticleIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [visibleImage, setVisibleImage] = useState<string | ''>('');
    const [isCurrentArticleRead, setIsCurrentArticleRead] = useState(false);
    const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

    const {articles, userArticles, setArticles, setUserArticlesByCategories} = useContext(ArticlesContext);
    const { readArticles, isArticleRead, markArticleAsRead } = useContext(ReadArticlesContext);
    const {userCategories} = useContext(CategoriesContext);
    const { language } = useContext(LanguageContext);
    const colors = useThemeColors();

    async function getArticles(date: string, changeIsLoading = true) {
        try {
            if (changeIsLoading) setIsLoading(true);
            console.log('fetching articles...');
            
            const data = await fetchArticles(date, language);
            setArticles(data.articles);
            const sortedArticles = sortArticles(data.articles, readArticles);
            setUserArticlesByCategories(userCategories, sortedArticles);
            
            if (!visibleImage && data.articles.length > 0) {
                setVisibleImage(sortedArticles[0].image);
            }
            console.log(data.count);
            
        } catch (error) {
            console.error(error);
        } finally {
            if (changeIsLoading) setIsLoading(false);
        }
    }

    async function handleReadArticle(articleId: string) {
        if (isArticleRead(articleId)) {
            setIsCurrentArticleRead(true);
        } else {
            await markArticleAsRead(articleId, language);
            setIsCurrentArticleRead(false);
        }
    };

    function handleDateChange(newDate: string) {        
        setSelectedDate(newDate);        
        getArticles(newDate, false);
    };

    useEffect(() => {
        getArticles(selectedDate);
    }, [language]);

    useEffect(() => {
        if (userCategories) {
            setUserArticlesByCategories(userCategories, articles);
        }
    }, [userCategories]);

    useEffect(() => {
        if (userArticles.length > 0 && userArticles[articleIndex]) {
            setVisibleImage(userArticles[articleIndex].image);
            handleReadArticle(userArticles[articleIndex].id);
        } else {
            setVisibleImage('');
        }
    }, [userArticles, articleIndex]);

    if (isLoading || !userArticles) {
        return <LoadingArticlesOverlay />;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>

                    <CustomDrawer 
                        isVisible={isDrawerVisible} 
                        onClose={() => setIsDrawerVisible(false)}
                    >
                        <CustomDrawerContent />
                    </CustomDrawer>

                <ArticleScreenImage image={visibleImage} />

                <SafeArea style={styles.contentContainer}>
                    <EdgeDetector style={{ left: -20 }} onSwipeStart={() => setIsDrawerVisible(true)} />
                    <View style={styles.summaryBox}>
                        <DateCarousel 
                            style={{ marginBottom: 16 }}
                            onDateChange={handleDateChange} 
                        />
                        <ArticleSummaryBox
                            articles={userArticles}
                            onArticleChange={(index) => setArticleIndex(index)}
                            onRefetchArticles={() => getArticles(selectedDate, false)}
                            isRead={isCurrentArticleRead}
                        />
                    </View>
                    <AppLogo onPress={() => setIsDrawerVisible(true)} />
                </SafeArea>


            </View>
        </GestureHandlerRootView>
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
        left: 0,
        right: 0,
    },
    
});
