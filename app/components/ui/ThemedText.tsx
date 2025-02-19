import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, Text, TextProps } from "react-native"

const styles = StyleSheet.create({
    articleSummaryTitle: {
        fontFamily: 'PTSerif-Bold',
        fontSize: 18,
        marginBottom: 8,
    },
    articleBody: {
        fontFamily: 'PTSerif-Regular',
        fontSize: 16,
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
    articleAnswer: {
        fontFamily: 'PTSerif-RegularItalic',
        fontSize: 14,
    },
    category: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    regular: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 14,
    },
    regularSm: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 12,
    },
    medium: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
    },
    mediumXs: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 10,
    },
    semibold: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 14,
    },
    semiboldXs: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 10,
    },
    semiboldXl: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 20,
    },
    title: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 22,
    },
    titleBold: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
    },
    titleXl: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 22,
    },
    titleBoldXl: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 22,
    },
});

type Props = TextProps & {
    variant?: keyof typeof styles,
    color?: keyof typeof Colors["dark"]
}

export default function ThemedText({variant, color, style, ...rest}: Props) {
    const colors = useThemeColors();
    return (
        <Text style={[styles[variant ?? 'articleBody'], {color: colors[color ?? "text"]}, style]} allowFontScaling={false} {...rest}></Text>
    )
}

