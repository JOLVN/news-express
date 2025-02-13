import { useThemeColors } from "@/hooks/useThemeColors";
import { Platform, Pressable, StyleSheet } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { ModalContext } from "@/contexts/ModalContext";

export default function ThemeButton() {

    const { showThemeModal } = useContext(ModalContext);
    const { theme } = useContext(ThemeContext);
    const colors = useThemeColors();
    const iconName = theme === 'dark' ? 'light-up' : 'moon';

    return (
        <>
            <Pressable 
                style={[styles.container, {backgroundColor: colors.gray700}]}
                onPress={showThemeModal}
            >
                <Entypo name={iconName} size={24} color={colors.text} />
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === 'ios' ? 12 : 8,
        borderRadius: 15,
    },
    
});