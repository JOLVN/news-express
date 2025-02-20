import { Alert, Pressable, StyleSheet, ViewStyle } from "react-native";
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
    isSubscribed: boolean,
    style?: object,
}

export default function SubscriptionButton({selectedSubscription, isTrialEligible, isSubscribed, packages, style}: Props) {

    const { buyCredits } = useContext(CreditsContext);
    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);

    async function handlePurchase() {
        if (isSubscribed) {
            Alert.alert(Texts[language].subscriptionAlreadySubscribedAlertTitle, Texts[language].subscriptionAlreadySubscribedAlertMessage);
            return;
        }
        
        const packageToPurchase = packages.find(pkg => pkg.identifier === selectedSubscription);
        
        if (!packageToPurchase) {
            throw new Error('Package not found');
        }

        const customerInfo = await PurchasesService.purchasePackage(packageToPurchase);
        
        if (!customerInfo) {
            return;
        }
        
        // Verify if the purchase was successful
        if (Object.keys(customerInfo.entitlements.active).length > 0) {
            await buyCredits();
            // TODO: Add modal and go to home
            console.log('Purchase successful');
        }
    };

    return (
        <Pressable 
            onPress={handlePurchase} 
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