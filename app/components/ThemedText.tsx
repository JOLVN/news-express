import { StyleSheet, Text, TextProps } from "react-native"

const styles = StyleSheet.create({
    body: {
        fontSize: 16
    },
    articleTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    articleBody: {
        fontSize: 16
    },
    articleMeta: {
        fontSize: 14
    },
});

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: string
}

export default function ThemedText({variant, color, ...rest}: Props) {
    return (
        <Text style={styles[variant ?? 'body']} {...rest}></Text>
    )
}

