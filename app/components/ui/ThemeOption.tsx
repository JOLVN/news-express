import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    title: string;
    onPress: () => void;
    selected: boolean;
}

export default function ThemeOption({title, onPress, selected}: Props) {

    const colors = useThemeColors();

    return (
        <Pressable 
            style={styles.optionContainer} 
            onPress={onPress}
        >
            <ThemedText>{title}</ThemedText>
            {selected && <View style={[styles.radioButton, { borderColor: colors.text }]} />}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
    },
});