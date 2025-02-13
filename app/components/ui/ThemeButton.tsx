import { useThemeColors } from "@/hooks/useThemeColors";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Entypo } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import SwitchThemeModal from "../SwitchThemeModal";
import { ModalContext } from "@/contexts/ModalContext";

export default function ThemeButton() {

    const { showThemeModal } = useContext(ModalContext);
    const { theme, toggleTheme, isSystemTheme, setIsSystemTheme } = useContext(ThemeContext);
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