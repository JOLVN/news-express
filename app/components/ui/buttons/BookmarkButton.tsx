import { ModalContext } from "@/contexts/ModalContext";
import { UserDataContext } from "@/contexts/UserDataContext";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
    onPress: () => void;
    isBookmarked: boolean;
    style?: object;
    color?: string;
}

export default function BookmarkButton({ onPress, isBookmarked, color, style }: Props) {

    const colors = useThemeColors();
    const { isSubscribed } = useContext(UserDataContext);
    const { showSubscriptionModal } = useContext(ModalContext);

    function handlePress() {
        if (!isSubscribed) {
            showSubscriptionModal();
            return;
        }
        onPress();
    }

    return (
        <Pressable 
            onPress={handlePress} 
            android_ripple={{ color: colors.gray600 }} 
            style={({ pressed }) => [pressed && styles.pressed, style]}
        >
            <View>
                <Ionicons name={isBookmarked && isSubscribed ? 'bookmark' : 'bookmark-outline'} size={24} color={color || colors.white} />
                {!isSubscribed && (
                    <View style={styles.lockContainer} >
                        <Ionicons name="lock-closed" size={14} color={color || colors.white}  />
                    </View>
                )}
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.8,
    },
    lockContainer: {
        position: 'absolute',
        top: -3,
        right: -3,
        width: 14,
        height: 14,
        borderRadius: 4,
    },
});