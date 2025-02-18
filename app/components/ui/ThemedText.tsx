import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Platform, StyleSheet, Text, TextProps } from "react-native"

const styles = StyleSheet.create({
    articleSummaryTitle: {
        fontFamily: 'PTSerif-Bold',
        fontSize: Platform.OS === 'ios' ? 20 : 16,
        marginBottom: Platform.OS === 'ios' ? 8 : 4,
    },
    articleBody: {
        fontFamily: 'PTSerif-Regular',
        fontSize: Platform.OS === 'ios' ? 20 : 16,
    },
    articleTitle: {
        fontFamily: 'PTSerif-Bold',
        fontSize: Platform.OS === 'ios' ? 26 : 20,
    },
    articleItalic: {
        fontFamily: 'PTSerif-BoldItalic',
        fontSize: Platform.OS === 'ios' ? 20 : 16,
    },
    articleQuestion: {
        fontFamily: 'PTSerif-Regular',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
    },
    articleAnswer: {
        fontFamily: 'PTSerif-RegularItalic',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
    },
    category: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Platform.OS === 'ios' ? 16 : 12,
    },
    regular: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
    },
    regularSm: {
        fontFamily: 'Montserrat-Regular',
        fontSize: Platform.OS === 'ios' ? 16 : 12,
    },
    medium: {
        fontFamily: 'Montserrat-Medium',
        fontSize: Platform.OS === 'ios' ? 16 : 14,
    },
    mediumXs: {
        fontFamily: 'Montserrat-Medium',
        fontSize: Platform.OS === 'ios' ? 12 : 10,
    },
    semibold: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Platform.OS === 'ios' ? 18 : 14,
    },
    semiboldXs: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Platform.OS === 'ios' ? 12 : 10,
    },
    semiboldXl: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: Platform.OS === 'ios' ? 24 : 20,
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
        fontSize: Platform.OS === 'ios' ? 24 : 22,
    },
    titleBoldXl: {
        fontFamily: 'Montserrat-Bold',
        fontSize: Platform.OS === 'ios' ? 24 : 22,
    },
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

