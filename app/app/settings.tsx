import CategoriesContainer from "@/components/drawer/CategoriesContainer";
import SafeArea from "@/components/SafeArea";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";

export default function Settings() {

    const colors = useThemeColors();

    return (
        <SafeArea style={{ backgroundColor: colors.coloredBackground }}>
            <View style={[styles.container]}>
                
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});