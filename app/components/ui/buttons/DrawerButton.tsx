import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { forwardRef, useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Shadows } from "@/constants/Shadows";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    text: string;
    icon?: string;
}

const DrawerButton = forwardRef<View, Props>(({text, icon, ...rest}, ref) => {

    const colors = useThemeColors();
    const { theme } = useContext(ThemeContext);

    return (
        <Pressable 
            ref={ref}  
            {...rest}
            android_ripple={{color: colors.gray600}}
            style={({pressed}) => [styles.button, pressed && styles.pressed, { backgroundColor: colors.gray700 }, Shadows[theme].large]}
        >
            <ThemedText variant="medium">{text}</ThemedText>
            {icon && <Ionicons name={icon as any} size={20} color={colors.text} />}
        </Pressable>
    )
});

DrawerButton.displayName = 'DrawerButton';

export default DrawerButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10
    },
    pressed: {
        opacity: 0.8,
    }
});