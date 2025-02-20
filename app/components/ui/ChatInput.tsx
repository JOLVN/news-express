import { useThemeColors } from "@/hooks/useThemeColors";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Shadows } from "@/constants/Shadows";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { LanguageContext } from "@/contexts/LanguageContext";
import ThemedText from "@/components/ui/ThemedText";
import { Texts } from "@/constants/Texts";
import { CreditsContext } from "@/contexts/CreditsContext";

type Props = {
    onInput: (text: string) => void;
    onSubmit: () => void;
    value: string;
    style?: object;
}

export default function ChatInput({onInput, onSubmit, value, style}: Props) {

    const colors = useThemeColors();
    const { credits } = useContext(CreditsContext);
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);

    return (
        <View style={[styles.container, style]}>
            <View>
                <TextInput 
                    onChangeText={onInput}
                    placeholder={Texts[language].chatInputPlaceholder}
                    placeholderTextColor={colors.gray500}
                    value={value}
                    allowFontScaling={false}
                    style={[
                        styles.input, 
                        { backgroundColor: colors.background, color: colors.text },
                        {...Shadows[theme].extraLarge}
                    ]}
                />
                <Pressable 
                    onPress={onSubmit} 
                    style={({pressed}) => [styles.submitButton, {backgroundColor: value.length > 0 ? colors.accent500 : colors.accent400}, pressed && styles.pressed]}
                >
                    <Entypo name="chevron-right" size={24} color={colors.background} />
                </Pressable>
            </View>
            <ThemedText style={styles.remainingCredits} variant="regularSm" color="gray500">{Texts[language].remainingCredits} : 
                <ThemedText variant="regularSm"> {credits}</ThemedText>
            </ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    remainingCredits: {
        marginTop: 10,
        alignSelf: 'center',
    },
    input: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingRight: 70,
        fontFamily: 'Montserrat_400Regular',
        fontSize: 14,
    },
    pressed: {
        opacity: 0.6,
    },
    submitButton: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{translateY: '-50%'}],
        borderRadius: 7,
        padding: 2,
    }
});