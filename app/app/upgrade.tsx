import SubscriptionButton from "@/components/ui/buttons/SubscriptionButton";
import SubscriptionChoice from "@/components/ui/SubscriptionChoice";
import ThemedText from "@/components/ui/ThemedText";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Upgrade() {

    const { language } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);
    const colors = useThemeColors();
    const [selectedSubscription, setSelectedSubscription] = useState<'annual' | 'monthly'>('annual');

    const ANNUAL_SUBSCRIPTION_PRICE = 28.99;
    const MONTHLY_SUBSCRIPTION_PRICE = 2.99;

    return (
        <View style={[styles.container, { backgroundColor: colors.coloredBackground }]}>
            <ThemedText variant="titleXl" style={styles.title}>
                {Texts[language].upgradeTitle1}
                <ThemedText variant="titleBoldXl" color="accent500"> Xpress Premium </ThemedText>
                {Texts[language].upgradeTitle2}
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
                <SubscriptionChoice 
                    isAnnual={true} 
                    isSelected={selectedSubscription === 'annual'} 
                    price={ANNUAL_SUBSCRIPTION_PRICE}
                    onPress={() => setSelectedSubscription('annual')} 
                />
                <SubscriptionChoice 
                    isAnnual={false} 
                    isSelected={selectedSubscription === 'monthly'} 
                    price={MONTHLY_SUBSCRIPTION_PRICE}
                    onPress={() => setSelectedSubscription('monthly')}
                />
            </View>
            <View style={styles.bottom}>
                <SubscriptionButton isAnnual={selectedSubscription === 'annual'} />
                <ThemedText variant="mediumXs" color="gray500" style={styles.textCenter}>
                    {Texts[language].subscriptionInfo
                        .replace('XX.XX', selectedSubscription === 'annual' ? String(ANNUAL_SUBSCRIPTION_PRICE) : String(MONTHLY_SUBSCRIPTION_PRICE))
                        .replace('UU', selectedSubscription === 'annual' ? Texts[language].year : Texts[language].month)
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
        flexDirection: 'row',
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