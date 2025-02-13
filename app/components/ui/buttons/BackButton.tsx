import { Pressable, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    onPress: () => void,
    style?: object,
}

export default function BackButton({onPress, style}: Props) {

    const colors = useThemeColors();

    return (
        <Pressable onPress={onPress} style={[style, styles.container, {backgroundColor: colors.gray700, borderColor: colors.gray500}]}>
            <Entypo name="chevron-left" size={24} color={colors.accent500} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        borderRadius: 10,
        borderWidth: 0.5,
    }
});