import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = ViewStyle & {
    children: string,
    onPress: () => void,
    style?: object,
}

export default function Button({children, onPress, style}: Props) {

    const colors = useThemeColors();

    return (
        <Pressable onPress={onPress} style={[styles.button, style, {backgroundColor: colors.accent500}]}>
            <ThemedText variant={'medium'} color={'black'}>{children}</ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
    }
});