import { useThemeColors } from "@/hooks/useThemeColors";
import { Modal, StyleSheet, View, Dimensions, Pressable } from "react-native";
import Animated, { 
    useAnimatedStyle, 
    withSpring, 
    useSharedValue,
} from 'react-native-reanimated';
import { useEffect } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ThemedText from "../ui/ThemedText";
import Button from "../ui/buttons/Button";
import { router } from "expo-router";
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


export default function SubscriptionPremiumModal() {

    const { isSubscriptionModalVisible, hideSubscriptionModal } = useContext(ModalContext);
    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const translateY = useSharedValue(SCREEN_HEIGHT);

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

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        if (isSubscriptionModalVisible) {
            translateY.value = withSpring(0, {
                damping: 20,
                stiffness: 90,
            });
        } else {
            translateY.value = withSpring(SCREEN_HEIGHT, {
                damping: 20,
                stiffness: 90,
            });
        }
    }, [isSubscriptionModalVisible]);

    const handleNavigateToPaywall = () => {
        hideSubscriptionModal();
        router.push('/paywall');
    };

    return (
        <Modal
            visible={isSubscriptionModalVisible}
            transparent
            animationType="fade"
            onRequestClose={hideSubscriptionModal}
        >
            <View style={styles.overlay}>
                <Pressable 
                    style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    onPress={hideSubscriptionModal}
                />
                <Animated.View 
                    style={[
                        styles.modalContainer,
                        animatedStyle,
                        { backgroundColor: colors.gray600 }
                    ]}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <ThemedText variant="title" style={styles.title}>
                            {Texts[language].premiumOffer}
                        </ThemedText>
                        <Pressable onPress={hideSubscriptionModal} style={({pressed}) => [styles.closeButton, pressed && styles.pressed]}>
                            <MaterialCommunityIcons
                                name="close"
                                size={24}
                                color={colors.text}
                            />
                        </Pressable>
                    </View>

                    {/* Premium Features */}
                    <View style={styles.featuresContainer}>
                        {premiumFeatures.map((feature, index) => (
                            <View key={index} style={styles.featureItem}>
                                <MaterialCommunityIcons
                                    name={feature.icon as any}
                                    size={28}
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

                    {/* Footer with CTA */}
                    <View style={styles.footer}>
                        <Button 
                            onPress={handleNavigateToPaywall}
                            style={styles.button}
                        >
                            {Texts[language].seeOffers}
                        </Button>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxHeight: '80%',
        borderRadius: 16,
        padding: 20,
        justifyContent: 'space-between',
        gap: 30
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        textAlign: 'center',
    },
    closeButton: {
        padding: 8,
        position: 'absolute',
        right: 0,
    },
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
    pressed: {
        opacity: 0.8,
    },
});