import { Image, Pressable, StyleSheet, View } from "react-native";
import { ForwardedRef, forwardRef } from "react";
import { Image as ExpoImage } from 'expo-image';

type Props = {
    style?: object,
    onPress?: () => void,
}

const ChatbotButton = forwardRef<View, Props>(({ style, onPress, ...props }, ref) => {
    return (
        <Pressable 
            ref={ref}
            style={style}
            onPress={onPress}
            {...props}
        >
            <ExpoImage
                style={styles.image} 
                source={require('@/assets/images/chatbot.png')} 
                contentFit="contain"
                cachePolicy="memory-disk"
            />
        </Pressable>
    )
});

ChatbotButton.displayName = 'ChatbotButton';

export default ChatbotButton;

const styles = StyleSheet.create({
    image: {
        borderRadius: 15,
        width: 60,
        height: 60,
    }
});