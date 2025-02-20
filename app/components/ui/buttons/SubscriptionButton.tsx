import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Texts } from "@/constants/Texts";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { CreditsContext } from "@/contexts/CreditsContext";
import { PurchasesService } from "@/services/Purchases";
import { PurchasesPackage } from "react-native-purchases";

type Props = ViewStyle & {
    selectedSubscription: string,
    packages: PurchasesPackage[],
    isTrialEligible: boolean,
    style?: object,
}

export default function SubscriptionButton({selectedSubscription, isTrialEligible, packages, style}: Props) {

    const { refreshCredits } = useContext(CreditsContext);
    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);

    function handleSubscription() {
        console.log('Subscribing...');
    }

    

    const handlePurchase = async (pkg: PurchasesPackage) => {
        try {
            await PurchasesService.purchasePackage(pkg);
            await refreshCredits();
            // Afficher un message de succès
        } catch (error) {
            // Gérer l'erreur
        }
    };

    return (
        <Pressable 
            onPress={() => handlePurchase(packages[0])} 
            style={({pressed}) => [styles.button, style, {backgroundColor: colors.accent500}, pressed && styles.pressed]}
            android_ripple={{color: colors.accent500}}
        >
            <ThemedText variant={'semibold'} color={'black'}>
                {isTrialEligible ? Texts[language].subscriptionTrialButton : Texts[language].subscriptionButton}
            </ThemedText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    pressed: {
        opacity: 0.8,
    }
});