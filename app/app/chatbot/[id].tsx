import BackButton from "@/components/ui/buttons/BackButton";
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
            <BackButton onPress={handleGoBack} style={styles.backButton} />
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
    }
});