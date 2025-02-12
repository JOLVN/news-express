import { View } from "react-native";
import ThemeSwitch from "./ThemeSwitch";
import SafeArea from "../SafeArea";
import ThemedText from "../ui/ThemedText";
import CategoriesContainer from "./CategoriesContainer";

export default function CustomDrawerContent() {
    
    return (
        <SafeArea>
            <View style={styles.container}>
                <ThemedText variant="articleSummaryTitle">Personalise ton feed</ThemedText>
                <CategoriesContainer style={{ marginTop: 10 }} />
                <ThemeSwitch />
            </View>
        </SafeArea>
    )
}

const styles = {
    container: {
        padding: 16,
    }
}