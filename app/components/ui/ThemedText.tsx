import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Platform, StyleSheet, Text, TextProps } from "react-native"

const styles = StyleSheet.create({
    articleSummaryTitle: {
        fontFamily: 'PTSerif-Bold',
        fontSize: Platform.OS === 'ios' ? 22 : 16,
        marginBottom: Platform.OS === 'ios' ? 8 : 4,
    },
    articleBody: {
        fontFamily: 'PTSerif-Regular',
        fontSize: Platform.OS === 'ios' ? 20 : 14,
    },
    articleTitle: {
        fontFamily: 'PTSerif-Bold',
        fontSize: 20,
    },
    articleItalic: {
        fontFamily: 'PTSerif-BoldItalic',
        fontSize: 16,
    },
    articleQuestion: {
        fontFamily: 'PTSerif-Regular',
        fontSize: 14,
    },
    regular: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
    },
    medium: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 16,
    }
});

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["dark"]
}

export default function ThemedText({variant, color, style, ...rest}: Props) {
    const colors = useThemeColors();
    return (
        <Text style={[styles[variant ?? 'articleBody'], {color: colors[color ?? "text"]}, style]} {...rest}></Text>
    )
}

