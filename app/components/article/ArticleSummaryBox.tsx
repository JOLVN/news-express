import { Shadows } from "@/constants/Shadows";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Article } from "@/types/articles";
import { useCallback, useContext, useRef, useState } from "react";
import { Dimensions, FlatList, RefreshControl, StyleSheet, View, ViewProps, ViewToken } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import FlatButton from "../ui/buttons/FlatButton";
import { Link } from "expo-router";
import ListenButton from "@/components/ui/buttons/ListenButton";
import { useGoogleTTS } from "@/hooks/useGoogleTTS";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Texts } from "@/constants/Texts";

const { height } = Dimensions.get('window');

type Props = ViewProps & {
    onArticleChange: (index: number) => void,
    articles: Article[],
    onRefetchArticles?: () => Promise<void>,
    isRead: boolean,
}

export default function ArticleSummaryBox({ articles, onArticleChange, style, onRefetchArticles, isRead, ...rest }: Props) {

    const colors = useThemeColors();
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
    const { speak, stop, isPlaying, error } = useGoogleTTS();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onViewableItemsChanged = useRef(({ viewableItems }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => {
        stop();
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index ?? 0;
            onArticleChange(newIndex);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const onRefresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            await onRefetchArticles?.();
        } catch (error) {
            console.error('Error while refreshing articles:', error);
        } finally {
            setIsRefreshing(false);
        }
    }, [onRefetchArticles]);

    function onListenPress(article: Article) {
        if (isPlaying) stop();
        else speak(article.summary, language);
    }

    function EmptyList() {
        return (
            <View style={styles.emptyListContainer}>
                <ThemedText variant={'articleBody'} style={{ textAlign: 'center' }}>
                    {Texts[language].noArticles}
                </ThemedText>
            </View>
        )
    }

    function ArticleSummary({ article }: { article: Article })  {
        return (
            <View style={[styles.articleContainer]} {...rest}>
                <View style={styles.articleSummaryContainer}>
                    <ThemedText variant={'articleSummaryTitle'}>{article.title}</ThemedText>
                    <ThemedText variant={'articleBody'}>{article.summary}</ThemedText>
                </View>
                <View style={styles.articleButtons}>
                    <ListenButton 
                        onPress={() => onListenPress(article)} 
                        isListening={isPlaying}
                    />
                    <Link href={{ pathname: '/article/[id]', params: {id: article.id }}} asChild>
                        <FlatButton borderBottom={true} >
                            {Texts[language].moreButton}
                        </FlatButton>
                    </Link>
                </View>
            </View>
        );
    }

    return (
        <View style={[style, styles.container, {backgroundColor: colors.background}, {...Shadows[theme].large}]}>
            {articles.length > 0 && (
                <View style={[styles.bookmark, { backgroundColor: isRead ? colors.gray500 : colors.accent600 }]} />
            )}
            <FlatList
                data={articles}
                ListEmptyComponent={EmptyList}
                renderItem={({ item }) => <ArticleSummary article={item} />}
                keyExtractor={item => item.id.toString()}
                pagingEnabled={true}
                showsVerticalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                snapToAlignment="start"
                snapToInterval={height * 0.5 - 32}
                bounces={true}
                viewabilityConfig={viewConfig}
                decelerationRate="fast"
                initialNumToRender={1}
                disableIntervalMomentum={true}
                overScrollMode="always"
                alwaysBounceVertical={true}
                contentContainerStyle={{  }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.accent600}
                        colors={[colors.accent600]}
                        progressBackgroundColor={colors.background}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height * 0.5,
        minHeight: 450,
        borderRadius: 10,
        padding: 16,
    },
    bookmark: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 50,
    },
    emptyListContainer: {
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        height: height * 0.5 - 32,
        minHeight: 428,
        alignItems: 'center',
    },
    articleContainer: {
        width: '100%',
        height: height * 0.5 - 32,
        minHeight: 428,
    },
    articleSummaryContainer: {
        overflow: 'hidden',
    },
    articleButtons: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 16,
    },
});