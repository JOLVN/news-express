import { Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    text: string;
    onPress: () => void;
}

export default function SettingButton({text, onPress}: Props) {

    const colors = useThemeColors();

    return (
        <Pressable style={styles.button} onPress={onPress}>
            <ThemedText variant="medium">{text}</ThemedText>
            <Entypo name="chevron-thin-right" size={24} color={colors.text} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 10,
    }
});