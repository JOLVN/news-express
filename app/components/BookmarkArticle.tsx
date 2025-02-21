import { Article } from "@/types/articles";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = {
    article: Article;
    spacing: number;
    size: number;
}

export default function BookmarkArticle({article, spacing, size}: Props) {
    return (
        <Link 
            href={{ pathname: '/article/[id]', params: {id: article.id }}}
            style={{ width: size, height: size, margin: spacing }}
            asChild
        >
            <Pressable style={[styles.itemContainer]}>
                <Animated.Image
                    entering={FadeInUp.springify().damping(12)}
                    source={{ uri: article.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
