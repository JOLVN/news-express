import { Pressable, StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Texts } from "@/constants/Texts";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import Animated, { useAnimatedStyle, withSpring, withTiming } from "react-native-reanimated";

type Props = {
    isAnnual: boolean;
    pricePerYear: string;
    isSelected?: boolean;
    isTrialEligible?: boolean;
    price: string;
    onPress: () => void;
}

export default function SubscriptionChoice({ isAnnual, pricePerYear, isSelected, isTrialEligible, price, onPress }: Props) {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);

    const animatedStyle = useAnimatedStyle(() => {
        const scale = withSpring(isSelected ? 1 : 0.8, {
            damping: 15,
            stiffness: 100
        });

        const borderColor = withTiming(
            isSelected ? colors.accent500 : colors.accent400,
            { duration: 300 }
        );

        const translateX = withSpring(
            isAnnual
                ? (isSelected ? 20 : 20)  // Monthly subscription
                : (isSelected ? -20 : -20), // Annual subscription
            {
                damping: 15,
                stiffness: 100
            }
        );

        return {
            transform: [
                { scale },
                { translateX }
            ],
            borderColor,
        };
    }, [isSelected, isAnnual, colors]);

    return (
        <Animated.View style={[
            styles.container, 
            { backgroundColor: colors.coloredBackground},
            animatedStyle,
            isSelected ? styles.isSelected : styles.isNotSelected,
        ]}>
            <Pressable onPress={onPress} style={styles.card}>
                <ThemedText variant="semibold">
                    {isAnnual ? Texts[language].annualSubscription : Texts[language].monthlySubscription}
                </ThemedText>
                <View style={styles.price}>
                    <ThemedText variant="semiboldXl" style={styles.textCenter}>
                        {price}
                    </ThemedText>
                    <ThemedText variant="regularSm" style={styles.textCenter}>
                        {isAnnual && isTrialEligible && Texts[language].annualSubscriptionTrialDescription}
                        {isAnnual && !isTrialEligible && Texts[language].annualSubscriptionDescription}
                        {!isAnnual && isTrialEligible && Texts[language].monthlySubscriptionTrialDescription}
                        {!isAnnual && !isTrialEligible && Texts[language].monthlySubscriptionDescription}
                    </ThemedText>
                </View>
                {isAnnual && (
                    <>
                        <View style={styles.barredPrice}>
                            <View style={[styles.barredLine, { backgroundColor: colors.gray500 }]} />
                            <ThemedText variant="regularSm" color="gray500">
                                {pricePerYear}
                            </ThemedText>
                        </View>
                        <View style={[styles.discount, { backgroundColor: colors.accent600 }]}>
                            <ThemedText variant="semiboldXs" style={styles.textCenter} color="black">
                                {Texts[language].discount}
                            </ThemedText>
                        </View>
                    </>
                )}
            </Pressable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    isSelected: {
        zIndex: 1,
    },
    isNotSelected: {
        zIndex: 0,
    },
    container: {
        width: 170,
        height: 180,
        borderRadius: 10,
        borderWidth: 1,
    },
    card: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
    },
    price: {
        gap: 15,
        marginBottom: 15,
    },
    textCenter: {
        textAlign: 'center',
    },
    barredPrice: {
        position: 'absolute',
        top: 50,
    },
    barredLine: {
        position: 'absolute',
        top: 7,
        width: '100%',
        height: 0.7,
    },
    discount: {
        position: 'absolute',
        bottom: -10,
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 10,
    }
});