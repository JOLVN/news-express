import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
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
    color?: keyof typeof Colors["dark"]
}

export default function ThemedText({variant, color, style, ...rest}: Props) {
    const colors = useThemeColors();
    return (
        <Text style={[styles[variant ?? 'body'], {color: colors[color ?? "text"]}, style]} {...rest}></Text>
    )
}

