import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";

type Props = {
    onPress: () => void;
    isBookmarked: boolean;
    style?: object;
    color?: string;
}

export default function BookmarkButton({ onPress, isBookmarked, color, style }: Props) {

    const colors = useThemeColors();

    return (
        <Pressable 
            onPress={onPress} 
            android_ripple={{ color: colors.gray600 }} 
            style={({ pressed }) => [pressed && styles.pressed, style]}
        >
            <Ionicons name={isBookmarked ? 'bookmark' : 'bookmark-outline'} size={24} color={color || colors.white} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.8,
    }
});