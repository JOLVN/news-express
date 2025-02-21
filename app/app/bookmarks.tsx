import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";

export default function Bookmarks() {

    const colors = useThemeColors();

    return (
        <View style={[styles.container, { backgroundColor: colors.coloredBackground }]}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});