import { useThemeColors } from "@/hooks/useThemeColors";
import { Message } from "@/types/chat";
import { StyleSheet, View } from "react-native";
import ThemedText from "@/components/ui/ThemedText";

type Props = {
    message: Message;
}

export default function ChatMessage({message}: Props) {

    const colors = useThemeColors();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: message.isUser ? colors.gray800 : colors.gray700,
                alignSelf: message.isUser ? 'flex-end' : 'flex-start',
            }
        ]}>
            <ThemedText variant="regular" color={message.isUser ? 'white' : 'text'}>{message.text}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
    }
});