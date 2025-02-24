import AppLogo from "@/components/AppLogo";
import ArticleScreenImage from "@/components/article/ArticleScreenImage";
import ArticleSummaryBox from "@/components/article/ArticleSummaryBox";
import DateCarousel from "@/components/DateCarousel";
import CustomDrawer from "@/components/drawer/CustomDrawer";
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import EdgeDetector from "@/components/EdgeDetector";
import LoadingArticlesOverlay from "@/components/LoadingArticlesOverlay";
import SafeArea from "@/components/SafeArea";
import BookmarkButton from "@/components/ui/buttons/BookmarkButton";
import { ArticlesContext } from "@/contexts/ArticlesContext";
import { BookmarksContext } from "@/contexts/BookmarksContext";
import { CategoriesContext } from "@/contexts/CategoriesContext";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ReadArticlesContext } from "@/contexts/ReadArticlesContext";
import { fetchArticles } from "@/functions/API";
import { sortArticles } from "@/functions/articles";
import { formatDate } from "@/functions/date";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Article } from "@/types/articles";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Index() {

    const [articleIndex, setArticleIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [visibleImage, setVisibleImage] = useState<string | ''>('');
    const [isCurrentArticleRead, setIsCurrentArticleRead] = useState(false);
    const [isCurrentArticleBookmarked, setIsCurrentArticleBookmarked] = useState(false);
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [selectedDate, setSelectedDate] = useState(formatDate(today));

    const {articles, userArticles, setArticles, setUserArticlesByCategories} = useContext(ArticlesContext);
    const { readArticles, isArticleRead, markArticleAsRead } = useContext(ReadArticlesContext);
    const { bookmarks, isArticleBookmarked, bookmarkArticle, unbookmarkArticle } = useContext(BookmarksContext);
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
            
            if (sortedArticles.length > 0) {
                setVisibleImage(sortedArticles[0].image);
                
                // Preload images in the background
                setTimeout(() => {
                    preloadImages(sortedArticles.slice(1));
                }, 100);
            }

            console.log(data.count);
            
        } catch (error) {
            console.error(error);
        } finally {
            if (changeIsLoading) setIsLoading(false);
        }
    }

    async function preloadImages(articles: Article[]) {
        const imagesToLoad = articles
            .map(article => article.image)
            .filter(image => 
                image && 
                image !== '' && 
                !preloadedImages.has(image)
            );
    
        // Preload images in batches of 3
        const batchSize = 3;
        for (let i = 0; i < imagesToLoad.length; i += batchSize) {
            const batch = imagesToLoad.slice(i, i + batchSize);
            await Promise.all(
                batch.map(async (imageUrl) => {
                    try {
                        await Image.prefetch(imageUrl);
                        setPreloadedImages(prev => new Set([...prev, imageUrl]));
                    } catch (error) {
                        console.error(`Failed to preload image: ${imageUrl}`, error);
                    }
                })
            );
        }
    }

    async function handleReadArticle(articleId: string) {
        if (isArticleRead(articleId)) {
            setIsCurrentArticleRead(true);
        } else {
            setIsCurrentArticleRead(false);
            await markArticleAsRead(articleId, language);
        }
    };

    function handleBookmark() {
        if (!userArticles[articleIndex]) return;
        if (isCurrentArticleBookmarked) {
            unbookmarkArticle(userArticles[articleIndex].id);
        } else {
            bookmarkArticle(userArticles[articleIndex].id);
        }
        setIsCurrentArticleBookmarked(!isCurrentArticleBookmarked);
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
            setIsCurrentArticleBookmarked(isArticleBookmarked(userArticles[articleIndex].id));            
        } else {
            setVisibleImage('');
        }
    }, [userArticles, articleIndex, bookmarks]);

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
                        <BookmarkButton style={styles.bookmarkButton} onPress={handleBookmark} isBookmarked={isCurrentArticleBookmarked} />
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
    bookmarkButton: {
        flexDirection: 'row-reverse',
        marginBottom: 16,
    },
    summaryBox: {
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
    },
    
});
