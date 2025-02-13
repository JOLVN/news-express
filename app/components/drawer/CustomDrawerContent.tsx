import { Pressable, StyleSheet, View } from "react-native";
import SafeArea from "@/components/SafeArea";
import ThemedText from "@/components/ui/ThemedText";
import CategoriesContainer from "@/components/drawer/CategoriesContainer";
import ThemeButton from "@/components/ui/ThemeButton";
import SettingsButton from "@/components/ui/SettingsButton";
import { Link } from "expo-router";

export default function CustomDrawerContent() {
    
    return (
        <SafeArea>
            <View style={styles.container}>
                <ThemedText variant="articleSummaryTitle">Personalise ton feed</ThemedText>
                <CategoriesContainer style={{ marginTop: 10 }} />
                <View style={styles.bottomContainer}>
                    <Link href={{ pathname: '/settings'}} asChild>
                        <SettingsButton />
                    </Link>
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
        width: '100%',
        bottom: 16,
        right: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});