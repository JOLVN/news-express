import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Chatbot() {

    const { id } = useLocalSearchParams();
    const colors = useThemeColors();

    return (
        <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
            <ThemedText>Chatbot {id}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});