import { useThemeColors } from "@/hooks/useThemeColors";
import { Message } from "@/types/chat";
import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";
import { Image as ExpoImage } from 'expo-image';

type Props = {
    message: Message;
}

export default function ChatMessage({message}: Props) {

    const colors = useThemeColors();

    return (
        <View>
             {!message.isUser && (
                <ExpoImage
                    style={styles.chatbotImage} 
                    source={require('@/assets/images/chatbot.png')} 
                    contentFit="contain"
                    cachePolicy="memory-disk"
                />
            )}
            <View style={[
                styles.container,
                {
                    backgroundColor: message.isUser ? colors.gray800 : colors.gray700,
                    alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                }
            ]}>
                <ThemedText variant="regular" color={'text'}>{message.text}</ThemedText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    },
    chatbotImage: {
        width: 30,
        height: 30,
        borderRadius: 10,
    }
});