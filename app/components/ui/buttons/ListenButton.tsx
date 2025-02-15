import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import ThemedText from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    onPress: () => void
}

export default function ListenButton({onPress}: Props) {

    const colors = useThemeColors();

    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.listenButton, pressed && styles.pressed]}>
            <Ionicons name="headset" size={24} color={colors.text} />
            <ThemedText variant={'regular'}>Écouter</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    listenButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        zIndex: 10010
    },
    pressed: {
        opacity: 0.5,
    }
});