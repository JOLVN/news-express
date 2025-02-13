import { StyleSheet, View } from "react-native";
import SafeArea from "@/components/SafeArea";
import ThemedText from "@/components/ui/ThemedText";
import CategoriesContainer from "./CategoriesContainer";
import ThemeButton from "@/components/ui/ThemeButton";

export default function CustomDrawerContent() {
    
    return (
        <SafeArea>
            <View style={styles.container}>
                <ThemedText variant="articleSummaryTitle">Personalise ton feed</ThemedText>
                <CategoriesContainer style={{ marginTop: 10 }} />
                <View style={styles.bottomContainer}>
                    <ThemeButton />
                </View>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    }
});