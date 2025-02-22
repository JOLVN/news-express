import LoadingArticlesOverlay from "@/components/LoadingArticlesOverlay";
import SubscriptionButton from "@/components/ui/buttons/SubscriptionButton";
import SubscriptionChoice from "@/components/ui/SubscriptionChoice";
import ThemedText from "@/components/ui/ThemedText";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { PurchasesService } from "@/services/Purchases";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { PurchasesPackage } from "react-native-purchases";

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

    async function loadOfferings() {
        const offerings = await PurchasesService.getOfferings();
        setPackages(offerings);
        if (offerings.length > 0) {
            setPricePerYear(offerings[0].product.pricePerYearString);
            setMonthlySubscriptionPrice(offerings[0].product.priceString);
            setAnnualSubscriptionPrice(offerings[1].product.priceString);
        }
    };

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
            <View>
                <View style={styles.advantage}>
                    <Entypo name="credit" size={24} color={colors.text} />
                    <ThemedText variant="regular" style={styles.title}>{Texts[language].creditsByMonth}</ThemedText>
                </View>
                <View style={styles.advantage}>
                    <Ionicons name="bookmarks" size={22} color={colors.text} />
                    <ThemedText variant="regular" style={styles.title}>{Texts[language].accessBookmarks}</ThemedText>
                </View>
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
                <ThemedText variant="mediumXs" color="gray500" style={styles.textCenter}>
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
    }
});