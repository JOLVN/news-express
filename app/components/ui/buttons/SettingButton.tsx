import { Platform, Pressable, StyleSheet, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { forwardRef } from "react";

type Props = {
    text: string;
    onPress?: () => void;
}

const SettingButton = forwardRef<View, Props>(({text, onPress}, ref) => {
    const colors = useThemeColors();

    return (
        <Pressable ref={ref} style={styles.button} onPress={onPress}>
            <ThemedText variant="medium">{text}</ThemedText>
            <Entypo name="chevron-thin-right" size={Platform.OS === 'ios' ? 22 : 20} color={colors.text} />
        </Pressable>
    )
});

SettingButton.displayName = 'SettingButton';

export default SettingButton;

const styles = StyleSheet.create({
    button: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Platform.OS === 'ios' ? 16 : 14,
        paddingHorizontal: Platform.OS === 'ios' ? 20 : 16,
        borderRadius: 10,
    }
});