import { Shadows } from "@/constants/Shadows";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Article } from "@/types/types";
import { useContext, useRef } from "react";
import { Dimensions, FlatList, StyleSheet, View, ViewProps, ViewToken } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import FlatButton from "../ui/FlatButton";
import { Link } from "expo-router";

const { height } = Dimensions.get('window');

type Props = ViewProps & {
    onArticleChange: (index: number) => void,
    articles: Article[]
}

export default function ArticleSummaryBox({ articles, onArticleChange, style, ...rest }: Props) {

    const colors = useThemeColors();
    const { theme } = useContext(ThemeContext);

    const onViewableItemsChanged = useRef(({ viewableItems }: {
        viewableItems: ViewToken[];
        changed: ViewToken[];
    }) => {                
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index ?? 0;
            onArticleChange(newIndex);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;


    function ArticleSummary({ article }: { article: Article })  {
        return (
            <View style={[styles.articleContainer]} {...rest}>
                <View style={styles.articleSummaryContainer}>
                    <ThemedText variant={'articleSummaryTitle'}>{article.title}</ThemedText>
                    <ThemedText variant={'articleBody'}>{article.summary}</ThemedText>
                </View>
                <View style={styles.articleButtons}>
                    <View>
                        <FlatButton onPress={() => {}} >
                            Écouter
                        </FlatButton>
                    </View>
                    <Link href={{ pathname: '/article/[id]', params: {id: article.id }}} asChild>
                        <FlatButton borderBottom={true} >
                            En savoir plus
                        </FlatButton>
                    </Link>
                </View>
            </View>
        );
    }

    return (
        <View style={[style, styles.container, {backgroundColor: colors.background}, {...Shadows[theme].large}]}>
            <FlatList
                data={articles}
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
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height * 0.5,
        borderRadius: 10,
        padding: 16,
    },
    articleContainer: {
        width: '100%',
        height: height * 0.5 - 32,
    },
    articleSummaryContainer: {
        overflow: 'hidden',
    },
    articleButtons: {
        position: 'absolute',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 10,
    }
});