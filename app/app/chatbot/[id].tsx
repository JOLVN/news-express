import CloseButton from "@/components/ui/buttons/CloseButton";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Chatbot() {

    const { id } = useLocalSearchParams();
    const colors = useThemeColors();

    const handleGoBack = () => {
        router.back();
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
            <CloseButton onPress={handleGoBack} style={styles.closeButton} />
            <ThemedText>Chatbot {id}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    }
});