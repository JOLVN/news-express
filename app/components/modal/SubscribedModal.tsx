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
import { Texts } from "@/constants/Texts";
import { LanguageContext } from "@/contexts/LanguageContext";
import { useContext } from "react";
import { ModalContext } from "@/contexts/ModalContext";
import { CreditsContext } from "@/contexts/CreditsContext";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SubscribedModal() {

    const { isSubscribedModalVisible, hideSubscribedModal } = useContext(ModalContext);
    const colors = useThemeColors();
    const { language } = useContext(LanguageContext);
    const { credits } = useContext(CreditsContext);
    const translateY = useSharedValue(SCREEN_HEIGHT);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        if (isSubscribedModalVisible) {
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
    }, [isSubscribedModalVisible]);

    return (
        <Modal
            visible={isSubscribedModalVisible}
            transparent
            animationType="fade"
            onRequestClose={hideSubscribedModal}
        >
            <View style={styles.overlay}>
                <Pressable 
                    style={{ flex: 1, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    onPress={hideSubscribedModal}
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
                            {Texts[language].thankYou}
                        </ThemedText>
                        <Pressable onPress={hideSubscribedModal} style={({pressed}) => [styles.closeButton, pressed && styles.pressed]}>
                            <MaterialCommunityIcons
                                name="close"
                                size={24}
                                color={colors.text}
                            />
                        </Pressable>
                    </View>

                    {/* Content */}
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

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Button 
                            onPress={hideSubscribedModal}
                            style={styles.button}
                        >
                            {Texts[language].continue}
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
    pressed: {
        opacity: 0.8,
    },
});