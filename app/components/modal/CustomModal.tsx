import { Modal, StyleSheet, View, Dimensions, Pressable } from "react-native";
import Animated, { 
    useAnimatedStyle, 
    withSpring, 
    useSharedValue,
} from 'react-native-reanimated';
import { useEffect, ReactNode } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemedText from "@/components/ui/ThemedText";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

interface CustomModalProps {
    visible: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    showHeader?: boolean;
}

export default function CustomModal({ 
    visible, 
    onClose, 
    title, 
    children,
    showHeader = true
}: CustomModalProps) {
    
    const colors = useThemeColors();
    const translateY = useSharedValue(SCREEN_HEIGHT);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });

    useEffect(() => {
        if (visible) {
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
    }, [visible]);

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Pressable 
                    style={StyleSheet.absoluteFill}
                    onPress={onClose}
                />
                <Animated.View 
                    style={[
                        styles.modalContainer,
                        animatedStyle,
                        { backgroundColor: colors.gray600 }
                    ]}
                >
                    {showHeader && (
                        <View style={styles.header}>
                            <ThemedText variant="title" style={styles.title}>
                                {title}
                            </ThemedText>
                            <Pressable 
                                onPress={onClose} 
                                style={({pressed}) => [
                                    styles.closeButton, 
                                    pressed && styles.pressed
                                ]}
                            >
                                <MaterialCommunityIcons
                                    name="close"
                                    size={24}
                                    color={colors.text}
                                />
                            </Pressable>
                        </View>
                    )}
                    {children}
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
        marginBottom: 20,
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
    pressed: {
        opacity: 0.8,
    },
});