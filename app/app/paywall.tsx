import * as WebBrowser from 'expo-web-browser';
import LoadingArticlesOverlay from "@/components/LoadingArticlesOverlay";
import FlatButton from "@/components/ui/buttons/FlatButton";
import SubscriptionButton from "@/components/ui/buttons/SubscriptionButton";
import SubscriptionChoice from "@/components/ui/SubscriptionChoice";
import ThemedText from "@/components/ui/ThemedText";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PurchasesService } from "@/services/Purchases";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Purchases, { PurchasesPackage } from "react-native-purchases";

export default function Paywall() {

    const ANNUAL_RC_ID = `$${process.env.EXPO_PUBLIC_ANNUAL_RC_ID}` as string;
    const MONTHLY_RC_ID = `$${process.env.EXPO_PUBLIC_MONTHLY_RC_ID}` as string;
    

    const { isTrialEligible, isSubscribed } = useContext(UserDataContext);
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);
    const [pricePerYear, setPricePerYear] = useState<string>('');
    const [annualSubscriptionPrice, setAnnualSubscriptionPrice] = useState<string>('');
    const [monthlySubscriptionPrice, setMonthlySubscriptionPrice] = useState<string>('');
    const { language } = useContext(LanguageContext);
    const colors = useThemeColors();
    const [selectedSubscription, setSelectedSubscription] = useState<string>(ANNUAL_RC_ID);

    const premiumFeatures = [
        {
            icon: "star",
            title: Texts[language].premiumFeature1Title,
            description: Texts[language].premiumFeature1Description,
        },
        {
            icon: "rocket",
            title: Texts[language].premiumFeature3Title,
            description: Texts[language].premiumFeature3Description,
        },
        {
            icon: "credit-card-outline",
            title: Texts[language].premiumFeature2Title,
            description: Texts[language].premiumFeature2Description,
        },
    ];

    async function loadOfferings() {
        const offerings = await PurchasesService.getOfferings();
        setPackages(offerings);
        if (offerings.length > 0) {
            setPricePerYear(offerings[0].product.pricePerYearString);
            setMonthlySubscriptionPrice(offerings[0].product.priceString);
            setAnnualSubscriptionPrice(offerings[1].product.priceString);
        }
    };

    async function handleRestorePurchases() {
        await Purchases.restorePurchases();
        router.push('/');
    }

    async function openPrivacyPolicy() {
        await WebBrowser.openBrowserAsync('https://www.privacypolicies.com/live/6df2145b-1a79-4a71-89c9-51f654918374');
    }

    async function openTermsAndConditions() {
        await WebBrowser.openBrowserAsync('https://www.apple.com/legal/internet-services/itunes/dev/stdeula/');
    }

    useEffect(() => {
        async function initialize() {
            await loadOfferings();
        }
        
        initialize();
    }, []);

    if (!packages || packages.length === 0) {
        return (
            <LoadingArticlesOverlay />
        )
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.coloredBackground }]}>
            <ThemedText variant="titleXl" style={styles.title}>
                {isTrialEligible ? Texts[language].upgradeTitle1WithTrial : Texts[language].upgradeTitle1}
                <ThemedText variant="titleBoldXl" color="accent500"> Xpress Premium </ThemedText>
                {isTrialEligible && Texts[language].upgradeTitle2WithTrial}
            </ThemedText>
            <View style={styles.featuresContainer}>
                {premiumFeatures.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                        <MaterialCommunityIcons
                            name={feature.icon as any}
                            size={28}
                            color={colors.accent500}
                        />
                        <View>
                            <ThemedText variant="semibold">
                                {feature.title}
                            </ThemedText>
                            <ThemedText variant="regular">
                                {feature.description}
                            </ThemedText>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.subscriptionChoices}>
                {packages.map((p, i) => {

                    return (
                        <SubscriptionChoice 
                            key={p.identifier}
                            isAnnual={p.identifier === ANNUAL_RC_ID}
                            pricePerYear={pricePerYear}
                            isSelected={selectedSubscription === p.identifier} 
                            isTrialEligible={isTrialEligible}
                            price={p.product.priceString}
                            onPress={() => setSelectedSubscription(p.identifier)}
                        />
                    )
                })}
            </View>
            <View style={styles.bottom}>
                <SubscriptionButton 
                    selectedSubscription={selectedSubscription} 
                    packages={packages} 
                    isTrialEligible={isTrialEligible}
                    isSubscribed={isSubscribed}
                />
                <ThemedText variant="mediumXs" style={styles.textCenter}>
                    {isTrialEligible ?
                        Texts[language].subscriptionTrialInfo
                            .replace('XX.XX', selectedSubscription === ANNUAL_RC_ID ? String(annualSubscriptionPrice) : String(monthlySubscriptionPrice))
                            .replace('UU', selectedSubscription === ANNUAL_RC_ID ? Texts[language].year : Texts[language].month)
                        :
                        Texts[language].subscriptionInfo
                            .replace('XX.XX', selectedSubscription === ANNUAL_RC_ID ? String(annualSubscriptionPrice) : String(monthlySubscriptionPrice))
                            .replace('UU', selectedSubscription === ANNUAL_RC_ID ? Texts[language].year : Texts[language].month)
                    }
                </ThemedText>
                <View style={[styles.bottomButtons, { borderColor: colors.gray500 }]}>
                    <FlatButton variant="regularXs" onPress={openPrivacyPolicy}>
                        {Texts[language].privacyPolicy}
                    </FlatButton>
                    <FlatButton variant="regularXs" onPress={openTermsAndConditions}>
                        {Texts[language].termsAndConditions}
                    </FlatButton>
                    <FlatButton variant="regularXs" onPress={handleRestorePurchases}>
                        {Texts[language].restorePurchases}
                    </FlatButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        alignItems: 'center',
        gap: 50
    },
    title: {
        textAlign: 'center',
    },
    advantage: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginVertical: 10,
    },
    featuresContainer: {
        gap: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    subscriptionChoices: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
    },
    textCenter: {
        textAlign: 'center',
    },
    bottom: {
        position: 'absolute',
        bottom: 50,
        gap: 10,
        width: '100%',
        alignItems: 'center',
    },
    bottomButtons: {
        paddingTop: 10,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        gap: 20,
    }
});