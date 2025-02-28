import * as WebBrowser from 'expo-web-browser';
import SettingButton from "@/components/ui/buttons/SettingButton";
import ThemedText from "@/components/ui/ThemedText";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ModalContext } from "@/contexts/ModalContext";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Constants from 'expo-constants';

export default function Settings() {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const { isSubscribed } = useContext(UserDataContext);
    const { showThemeModal, showCountryModal } = useContext(ModalContext);
    const version = Constants.expoConfig?.version || '1.0.0';

    async function openPrivacyPolicy() {
        await WebBrowser.openBrowserAsync('https://www.privacypolicies.com/live/6df2145b-1a79-4a71-89c9-51f654918374');
    }

    async function openTermsAndConditions() {
        await WebBrowser.openBrowserAsync('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/');
    }

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
                <SettingButton text={Texts[language].privacyPolicy} onPress={openPrivacyPolicy} />
                <SettingButton text={Texts[language].termsAndConditions} onPress={openTermsAndConditions} />
            </View>
            <ThemedText variant="regularSm" style={styles.version}>
                {Texts[language].version} {version}
            </ThemedText>
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
    },
    version: {
        textAlign: 'center',
    }
});