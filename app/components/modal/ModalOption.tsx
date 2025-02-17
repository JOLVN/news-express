import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    title: string;
    onPress: () => void;
    selected: boolean;
}

export default function ModalOption({title, onPress, selected}: Props) {

    const colors = useThemeColors();

    return (
        <Pressable 
            style={[styles.optionContainer, {backgroundColor: colors.gray800}]} 
            onPress={onPress}
        >
            <View style={[styles.radioButton, { borderColor: selected ? colors.accent500 : colors.gray500 }]} />
            <ThemedText variant="medium">{title}</ThemedText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
    },
});