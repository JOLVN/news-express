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
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => [styles.button, style, {backgroundColor: colors.accent500}, pressed && styles.pressed]}
            android_ripple={{color: colors.gray600}}
        >
            <ThemedText variant={'medium'} color="background">{children}</ThemedText>
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
    },
    pressed: {
        opacity: 0.8,
    }
});