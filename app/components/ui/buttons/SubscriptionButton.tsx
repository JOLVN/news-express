import { Pressable, PressableProps, StyleSheet, ViewStyle } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Texts } from "@/constants/Texts";
import { useContext } from "react";
import { LanguageContext } from "@/contexts/LanguageContext";

type Props = ViewStyle & {
    isAnnual: boolean,
    style?: object,
}

export default function SubscriptionButton({isAnnual, style}: Props) {

    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);

    function handleSubscription() {
        console.log('Subscribing...');
    }

    return (
        <Pressable 
            onPress={handleSubscription} 
            style={({pressed}) => [styles.button, style, {backgroundColor: colors.accent500}, pressed && styles.pressed]}
            android_ripple={{color: colors.accent500}}
        >
            <ThemedText variant={'semibold'} color={'black'}>{Texts[language].subscriptionButton}</ThemedText>
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