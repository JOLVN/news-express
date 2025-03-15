import ThemedText from "@/components/ui/ThemedText";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import CreditsSubscribeButton from "@/components/ui/buttons/CreditsSubscribeButton";
import { UserDataContext } from "@/contexts/UserDataContext";

export default function AboutCredits() {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const { isSubscribed } = useContext(UserDataContext);

    return (
        <ScrollView 
            style={[styles.container, { backgroundColor: colors.coloredBackground }]}
            contentContainerStyle={styles.contentContainer}
        >
            {/* Header */}
            <View style={styles.header}>
                <Entypo 
                    name="credit" 
                    size={40} 
                    color={colors.text} 
                />
                <ThemedText variant="title">
                    {Texts[language].creditsTitle}
                </ThemedText>
            </View>

            {/* Section What are credits */}
            <View style={styles.section}>
                <ThemedText variant="semiboldMd">
                    {Texts[language].whatAreCredits}
                </ThemedText>
                <ThemedText variant="regularMd">
                    {Texts[language].creditsExplanation}
                </ThemedText>
            </View>

            {/* Section How to use credits */}
            <View style={styles.section}>
                <ThemedText variant="semiboldMd">
                    {Texts[language].howToUseCredits}
                </ThemedText>
                <View style={styles.usageList}>
                    <View style={styles.usageItem}>
                        <MaterialCommunityIcons 
                            name="robot" 
                            size={24} 
                            color={colors.text} 
                        />
                        <ThemedText variant="regular">
                            {Texts[language].chatbotUsage}
                        </ThemedText>
                    </View>
                    <View style={styles.usageItem}>
                        <MaterialCommunityIcons 
                            name="text-to-speech" 
                            size={24} 
                            color={colors.text} 
                        />
                        <ThemedText variant="regular">
                            {Texts[language].listenUsage}
                        </ThemedText>
                    </View>
                </View>
            </View>

            {/* Section Monthly Credits */}
            <View style={styles.section}>
                <ThemedText variant="semiboldMd">
                    {Texts[language].monthlyCredits}
                </ThemedText>
                <View style={styles.planComparison}>
                    <View style={[styles.plan, { backgroundColor: colors.gray600 }]}>
                        <ThemedText variant="semiboldMd">
                            {Texts[language].freePlan}
                        </ThemedText>
                        <ThemedText variant="semiboldXl">10</ThemedText>
                        <ThemedText variant="regular">
                            {Texts[language].creditsPerMonth}
                        </ThemedText>
                    </View>
                    <View style={[styles.plan, styles.premiumPlan, { backgroundColor: colors.accent500 }]}>
                        <ThemedText variant="semiboldMd" style={{ color: colors.white }}>
                            {Texts[language].premiumPlan}
                        </ThemedText>
                        <ThemedText variant="semiboldXl" style={{ color: colors.white }}>
                            200
                        </ThemedText>
                        <ThemedText variant="regular" style={{ color: colors.white }}>
                            {Texts[language].creditsPerMonth}
                        </ThemedText>
                    </View>
                </View>
            </View>

            {/* Premium Button */}
            {!isSubscribed && (
                <CreditsSubscribeButton style={styles.upgradeButton} />
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 20,
        gap: 24,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    section: {
        gap: 12,
    },
    usageList: {
        gap: 16,
    },
    usageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    planComparison: {
        flexDirection: 'row',
        gap: 16,
        justifyContent: 'space-between',
    },
    plan: {
        flex: 1,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        gap: 8,
    },
    premiumPlan: {
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    upgradeButton: {
        marginTop: 24,
        width: '100%',
    },
});