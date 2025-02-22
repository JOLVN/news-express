import SettingButton from "@/components/ui/buttons/SettingButton";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ModalContext } from "@/contexts/ModalContext";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useContext } from "react";
import { Platform, StyleSheet, View } from "react-native";

export default function Settings() {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const { isSubscribed } = useContext(UserDataContext);
    const { showThemeModal, showCountryModal } = useContext(ModalContext);

    return (
        <View style={[styles.container, { backgroundColor: colors.coloredBackground }]}>
            <View style={[styles.section, {borderColor: colors.text}]}>
                {!isSubscribed && (
                    <Link href={{ pathname: '/paywall'}} asChild>
                        <SettingButton text={Texts[language].upgradeToXpressPremium} />
                    </Link>
                )}
                <Link href={{ pathname: '/aboutCredits'}} asChild>
                    <SettingButton text={Texts[language].creditsTitle} />
                </Link>
            </View>
            <View style={[styles.section, {borderColor: colors.text}]}>
                <SettingButton text={Texts[language].appearance} onPress={showThemeModal} />
                <SettingButton text={Texts[language].country} onPress={showCountryModal} />
            </View>
            <View style={[styles.section, {borderColor: colors.text}]}>
                <Link href={{ pathname: '/privacyPolicy'}} asChild>
                    <SettingButton text={Texts[language].privacyPolicy} />
                </Link>
                <Link href={{ pathname: '/termsAndConditions'}} asChild>
                    <SettingButton text={Texts[language].termsAndConditions} />
                </Link>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap: 20
    },
    section: {
        borderWidth: 1,
        borderRadius: 15,
    }
});