import { StyleSheet, View } from "react-native";
import SafeArea from "@/components/SafeArea";
import ThemedText from "@/components/ui/ThemedText";
import CategoriesContainer from "@/components/drawer/CategoriesContainer";
import ThemeButton from "@/components/ui/buttons/ThemeButton";
import SettingsButton from "@/components/ui/buttons/SettingsButton";
import { Link } from "expo-router";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Texts } from "@/constants/Texts";
import { Entypo } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import { CreditsContext } from "@/contexts/CreditsContext";
import DrawerButton from "@/components/ui/buttons/DrawerButton";
import { UserDataContext } from "@/contexts/UserDataContext";

export default function CustomDrawerContent() {

    const { isSubscribed } = useContext(UserDataContext);
    const { language } = useContext(LanguageContext);
    const { credits } = useContext(CreditsContext);
    const colors = useThemeColors();
    
    return (
        <SafeArea>
            <View style={styles.container}>
                <ThemedText variant="articleSummaryTitle">{Texts[language].personalizeFeed}</ThemedText>
                <CategoriesContainer style={{ marginTop: 10 }} />
                <View style={styles.bottomContainer}>
                    <View style={styles.remainingCredits}>
                        <ThemedText variant="regularSm">{Texts[language].remainingCredits}</ThemedText>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Entypo name="credit" size={18} color={colors.text} />
                            <ThemedText variant="semiboldMd">{ credits }</ThemedText>
                        </View>
                    </View>
                    {isSubscribed ?
                    (
                        <Link href={{ pathname: '/bookmarks'}} asChild>
                            <DrawerButton text={Texts[language].bookmarksButton} icon="bookmark" />
                        </Link>
                    ) :
                    (
                        <Link href={{ pathname: '/paywall'}} asChild>
                            <DrawerButton text={Texts[language].upgrade} />
                        </Link>
                    )}
                    <View style={styles.bottomButtons}>
                        <Link href={{ pathname: '/settings'}} asChild>
                            <SettingsButton />
                        </Link>
                        <ThemeButton />
                    </View>
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
        gap: 16
    },
    remainingCredits: {
        alignItems: 'center',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});