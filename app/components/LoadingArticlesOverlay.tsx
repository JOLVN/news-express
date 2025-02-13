import { useThemeColors } from "@/hooks/useThemeColors";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function LoadingArticlesOverlay() {

    const colors = useThemeColors();

    return (
        <View style={[styles.overlay, {backgroundColor: colors.coloredBackground}]}>
            <ActivityIndicator size="large" color={colors.accent500} />
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    }
});