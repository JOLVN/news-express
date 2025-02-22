import { LanguageContext } from "@/contexts/LanguageContext";
import { ModalContext } from "@/contexts/ModalContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useContext } from "react";
import CustomModal from "@/components/modal/CustomModal";
import { Texts } from "@/constants/Texts";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import Button from "@/components/ui/buttons/Button";
import { CreditsContext } from "@/contexts/CreditsContext";

export default function SubscribedModal() {

    const { isSubscribedModalVisible, hideSubscribedModal } = useContext(ModalContext);
    const { credits } = useContext(CreditsContext);
    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);

    return (
        <CustomModal
            visible={isSubscribedModalVisible}
            onClose={hideSubscribedModal}
            title={Texts[language].thankYou}
        >
            <View style={styles.content}>
                <MaterialCommunityIcons
                    name="check-circle"
                    size={64}
                    color={colors.accent500}
                    style={styles.icon}
                />
                <ThemedText variant="semibold" style={styles.message}>
                    {Texts[language].subscribedMessage}
                </ThemedText>
                <ThemedText variant="regular" style={styles.credits}>
                    {Texts[language].yourCredits}: {credits}
                </ThemedText>
            </View>

            <View style={styles.footer}>
                <Button 
                    onPress={hideSubscribedModal}
                    style={styles.button}
                >
                    {Texts[language].continue}
                </Button>
            </View>
        </CustomModal>
    );
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        gap: 20,
    },
    icon: {
        marginBottom: 10,
    },
    message: {
        textAlign: 'center',
        fontSize: 18,
    },
    credits: {
        textAlign: 'center',
        fontSize: 16,
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