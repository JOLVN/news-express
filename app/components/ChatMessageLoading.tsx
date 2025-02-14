import { useThemeColors } from "@/hooks/useThemeColors";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Image as ExpoImage } from 'expo-image';

export default function ChatMessageLoading() {

    const colors = useThemeColors();

    return (
        <View style={styles.container}>
            <ExpoImage
                style={styles.chatbotImage} 
                source={require('@/assets/images/chatbot.png')} 
                contentFit="contain"
                cachePolicy="memory-disk"
            />
            <ActivityIndicator size="small" color={colors.accent500} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        alignSelf: 'flex-start',
    },
    chatbotImage: {
        width: 30,
        height: 30,
        borderRadius: 10,
    }
});