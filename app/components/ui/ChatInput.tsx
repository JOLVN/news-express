import { useThemeColors } from "@/hooks/useThemeColors";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Shadows } from "@/constants/Shadows";
import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

type Props = {
    onInput: (text: string) => void;
    onSubmit: () => void;
    style?: object;
}

export default function ChatInput({onInput, onSubmit, style}: Props) {

    const colors = useThemeColors();
    const { theme } = useContext(ThemeContext);

    return (
        <View style={[styles.container, style]}>
            <TextInput 
                onChangeText={onInput}
                placeholder="Pose moi une question sur l'article !"
                style={[
                    styles.input, 
                    { backgroundColor: colors.background, color: colors.text },
                    {...Shadows[theme].extraLarge}
                ]}
            />
            <Pressable onPress={onSubmit} style={[styles.submitButton, {backgroundColor: colors.accent500}]}>
                <Entypo name="chevron-right" size={24} color="black" />
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
        fontSize: 16,
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