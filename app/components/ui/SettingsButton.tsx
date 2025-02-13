import { Pressable, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import ThemedText from "./ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function SettingsButton() {

    const colors = useThemeColors();

    return (
        <Pressable onPress={() => {}} style={({pressed}) => [styles.container, pressed && styles.pressed]}>
            <View style={[styles.button, {backgroundColor: colors.accent500}]}>
                <Feather name="settings" size={24} color="black" />
            </View>
            <ThemedText variant="medium">Paramètres</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        marginLeft: 8,
    },
    pressed: {
        opacity: 0.8,
    }
});