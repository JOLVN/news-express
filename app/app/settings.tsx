import CategoriesContainer from "@/components/drawer/CategoriesContainer";
import SafeArea from "@/components/SafeArea";
import ThemedText from "@/components/ui/ThemedText";
import { StyleSheet, View } from "react-native";

export default function Settings() {
    return (
        <SafeArea>
            <View style={styles.container}>
                <ThemedText variant="articleSummaryTitle">Personalise ton feed</ThemedText>
                <CategoriesContainer style={{ marginTop: 10 }} />
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