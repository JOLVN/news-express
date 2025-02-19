import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemedText from "@/components/ui/ThemedText";
import { Shadows } from "@/constants/Shadows";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { Category } from "@/types/categories";
import { LanguageContext } from "@/contexts/LanguageContext";

type Props = {
    category: Category;
    onPress: () => void;
    isSelected: boolean;
}

export default function CategoryWrapper({category, onPress, isSelected}: Props) {

    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
    const colors = useThemeColors();

    const iconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { rotate: withSpring(isSelected ? '360deg' : '0deg') }
            ]
        };
    });

    const borderStyle = useAnimatedStyle(() => ({
        borderColor: withSpring(isSelected ? colors.gray500 : 'transparent')
    }));

    return (
        <Animated.View style={[
            styles.container, 
            borderStyle,
            {
                backgroundColor: colors.gray800, 
            },
            isSelected && {...Shadows[theme].medium},
        ]}>
            <Text>{category.emoji}</Text>
            <ThemedText variant="category" color={isSelected ? 'text' : 'gray500'}>{category.name[language]}</ThemedText>
            <Pressable style={[styles.button, {borderColor: colors.accent500}]} onPress={onPress}>
                <Animated.View style={iconStyle}>
                    <AntDesign name={isSelected ? 'check' : 'plus'} size={14} color={colors.accent500} />
                </Animated.View>
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        gap: 10,
        borderWidth: 0.5,
    },
    button: {
        height: Platform.OS === 'ios' ? 25 : 20,
        width: Platform.OS === 'ios' ? 25 : 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
    }
});