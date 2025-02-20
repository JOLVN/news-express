import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { forwardRef, useContext } from "react";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { Shadows } from "@/constants/Shadows";

type Props = {
}

const PaywallButton = forwardRef<View, Props>(({...rest}, ref) => {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);

    return (
        <Pressable 
            ref={ref}  
            {...rest}
            android_ripple={{color: colors.gray600}}
            style={({pressed}) => [styles.button, pressed && styles.pressed, { backgroundColor: colors.gray700 }, Shadows[theme].large]}
        >
            <ThemedText variant="medium">{Texts[language].upgrade}</ThemedText>
        </Pressable>
    )
});

PaywallButton.displayName = 'PaywallButton';

export default PaywallButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.8,
    }
});