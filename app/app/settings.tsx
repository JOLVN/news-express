import SettingButton from "@/components/ui/buttons/SettingButton";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ModalContext } from "@/contexts/ModalContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useContext } from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function Settings() {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const { showThemeModal, showLanguageModal } = useContext(ModalContext);

    return (
        <View style={[styles.container, { backgroundColor: colors.coloredBackground }]}>
            <View style={[styles.section, {borderColor: colors.text}]}>
                <Link href={{ pathname: '/upgrade'}} asChild>
                    <SettingButton text={Texts[language].upgradeToXpressPremium} />
                </Link>
            </View>
            <View style={[styles.section, {borderColor: colors.text}]}>
                <SettingButton text={Texts[language].appearance} onPress={showThemeModal} />
                <SettingButton text={Texts[language].language} onPress={showLanguageModal} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Platform.OS === 'ios' ? 30 : 20,
        gap: 20
    },
    section: {
        borderWidth: 1,
        borderRadius: 15,
    }
});