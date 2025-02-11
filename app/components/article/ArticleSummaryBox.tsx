import { Shadows } from "@/constants/Shadows";
import { StyleSheet, Text, useColorScheme, View, ViewProps } from "react-native";

type Props = ViewProps & {
    article: {
        title: string,
        summary: string
    }
}

export default function ArticleSummaryBox({ article, style, ...rest }: Props) {
    const theme = useColorScheme() ?? "dark";
    return (
        <View style={[style, styles.container, {...Shadows[theme].medium}]} {...rest}>
            <Text style={styles.title}>{article.title}</Text>
            <Text style={styles.summary}>{article.summary}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    summary: {
        fontSize: 16
    }
});