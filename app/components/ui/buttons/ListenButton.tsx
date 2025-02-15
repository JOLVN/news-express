import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet } from "react-native";
import ThemedText from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { AudioWave } from "../AudioWave";

type Props = {
    onPress: () => void,
    isListening: boolean,
}

export default function ListenButton({onPress, isListening}: Props) {

    const colors = useThemeColors();

    return (
        <Pressable onPress={onPress} style={({pressed}) => [styles.listenButton, pressed && styles.pressed]}>
            {isListening ? (
                <MaterialIcons name="headset-off" size={24} color={colors.text} />
            ) : (
                <MaterialIcons name="headset" size={24} color={colors.text} />
            )}
            {isListening ? (
                <AudioWave 
                    isPlaying={isListening} 
                    color={colors.accent500}
                    size={12}
                />
            ) : (
                <ThemedText variant={'regular'}>Écouter</ThemedText>
            )}
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