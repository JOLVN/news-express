import { Alert, Pressable, StyleSheet, ViewStyle } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Texts } from "@/constants/Texts";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";
import { CreditsContext } from "@/contexts/CreditsContext";
import { PurchasesService } from "@/services/Purchases";
import { PurchasesPackage } from "react-native-purchases";
import { UserDataContext } from "@/contexts/UserDataContext";

type Props = ViewStyle & {
    style?: object,
}

export default function CreditsSubscribeButton({style}: Props) {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const { isTrialEligible, isSubscribed } = useContext(UserDataContext);

    function handleSubscriptionModalOpening() {
    }

    // if (isSubscribed) {
    //     return null;
    // }

    return (
        <Pressable 
            onPress={handleSubscriptionModalOpening} 
            style={({pressed}) => [styles.button, style, {backgroundColor: colors.accent500}, pressed && styles.pressed]}
            android_ripple={{color: colors.accent500}}
        >
            <ThemedText variant={'semibold'} color="background">
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