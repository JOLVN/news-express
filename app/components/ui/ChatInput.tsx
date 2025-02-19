import { useThemeColors } from "@/hooks/useThemeColors";
import { Platform, Pressable, StyleSheet, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Shadows } from "@/constants/Shadows";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";
import { LanguageContext } from "@/contexts/LanguageContext";
import { Texts } from "@/constants/Texts";

type Props = {
    onInput: (text: string) => void;
    onSubmit: () => void;
    value: string;
    style?: object;
}

export default function ChatInput({onInput, onSubmit, value, style}: Props) {

    const colors = useThemeColors();
    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);

    return (
        <View style={[styles.container, style]}>
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
            <Pressable onPress={onSubmit} style={[styles.submitButton, {backgroundColor: colors.accent500}]}>
                <Entypo name="chevron-right" size={24} color={colors.background} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
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
    submitButton: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{translateY: '-50%'}],
        borderRadius: 7,
        padding: 2,
    }
});