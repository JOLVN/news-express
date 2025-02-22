import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedText from "../ui/ThemedText";
import Button from "../ui/buttons/Button";
import { router } from "expo-router";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import CustomModal from "./CustomModal";


export default function SubscriptionPremiumModal() {

    const { isSubscriptionModalVisible, hideSubscriptionModal } = useContext(ModalContext);
    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);

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

    const handleNavigateToPaywall = () => {
        hideSubscriptionModal();
        router.push('/paywall');
    };

    return (
        <CustomModal
            visible={isSubscriptionModalVisible}
            onClose={hideSubscriptionModal}
            title={Texts[language].premiumOffer}
        >
            <View style={styles.featuresContainer}>
                {premiumFeatures.map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                        <MaterialCommunityIcons
                            name={feature.icon as any}
                            size={24}
                            color={colors.accent500}
                        />
                        <View style={styles.featureText}>
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

            <View style={styles.footer}>
                <Button 
                    onPress={handleNavigateToPaywall}
                    style={styles.button}
                >
                    {Texts[language].seeOffers}
                </Button>
            </View>
        </CustomModal>
    );
}

const styles = StyleSheet.create({
    featuresContainer: {
        gap: 24,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    featureText: {
        flex: 1,
        gap: 4,
    },
    footer: {
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.1)',
    },
    button: {
        width: '100%',
    },
});