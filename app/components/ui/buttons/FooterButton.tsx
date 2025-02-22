import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { forwardRef } from "react";

type Props = {
    children: string;
    onPress?: () => void;
    borderBottom?: boolean;
    style?: object;
}

export const FlatButton = forwardRef<View, Props>(({children, onPress, style, borderBottom, ...props }, ref) => {

    const colors = useThemeColors();

    return (
        <Pressable ref={ref} style={({pressed}) => [
            styles.button, 
            style, 
            borderBottom && {borderColor: colors.accent600, borderBottomWidth: 1}, 
            pressed && styles.pressed
        ]} onPress={onPress} {...props}>
            <ThemedText variant={"regular"}>{children}</ThemedText>
        </Pressable>
    )
});

FlatButton.displayName = 'FlatButton'

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 2,
    },
    pressed: {
        opacity: 0.8,
    }
});