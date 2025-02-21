import BookmarkArticle from "@/components/BookmarkArticle";
import SkeletonBookmark from "@/components/ui/skeletons/SkeletonBookmark";
import ThemedText from "@/components/ui/ThemedText";
import { BookmarksContext } from "@/contexts/BookmarksContext";
import { fetchArticlesByIds } from "@/functions/API";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Article } from "@/types/articles";
import { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const SPACING = 2;
const ITEM_SIZE = (width - (SPACING * (COLUMN_COUNT + 1))) / COLUMN_COUNT;

export default function Bookmarks() {

    const colors = useThemeColors();
    const [isLoading, setIsLoading] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const { bookmarks } = useContext(BookmarksContext);

    async function getBookmarksArticles() {
        try {
            setIsLoading(true);
            const data = await fetchArticlesByIds(bookmarks);
            const reverseArticles = data.articles.reverse();
            setArticles(reverseArticles);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getBookmarksArticles();
    }, [bookmarks]);

    const renderContent = () => {
        if (isLoading) {
            const skeletonArray = Array(18).fill(null);
            return (
                <FlatList
                    data={skeletonArray}
                    renderItem={({index}) => (
                        <SkeletonBookmark spacing={SPACING} size={ITEM_SIZE} index={index} />
                    )}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={COLUMN_COUNT}
                    contentContainerStyle={styles.gridContainer}
                    showsVerticalScrollIndicator={false}
                />
            );
        }

        return (
            <FlatList
                data={articles}
                renderItem={({item: article}) => (
                    <BookmarkArticle article={article} spacing={SPACING} size={ITEM_SIZE} />
                )}
                keyExtractor={(item) => item.id}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.gridContainer}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.centerContent}>
                        <ThemedText style={[styles.emptyText, { color: colors.text }]}>
                            Aucun article en favoris
                        </ThemedText>
                    </View>
                }
            />
        );
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.coloredBackground }]}>
            {renderContent()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gridContainer: {
        padding: SPACING,
    },
    itemContainer: {
        margin: SPACING,
        width: ITEM_SIZE,
        height: ITEM_SIZE,
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    }
});