import { Pressable, StyleSheet } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    children: string;
    onPress: () => void;
    borderBottom?: boolean;
    style?: object;
}

function FlatButton({children, onPress, style, borderBottom }: Props) {

    const colors = useThemeColors();

    return (
        <Pressable style={({pressed}) => [
            styles.button, 
            style, 
            borderBottom && {borderColor: colors.accent600, borderBottomWidth: 1}, 
            pressed && styles.pressed
        ]} onPress={onPress}>
            <ThemedText variant={"regular"}>{children}</ThemedText>
        </Pressable>
    )
}

export default FlatButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 2,
    },
    pressed: {
        opacity: 0.8,
    }
});