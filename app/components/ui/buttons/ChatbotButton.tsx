import { Image, Pressable, StyleSheet, View } from "react-native";

type Props = {
    style?: object,
}

export default function ChatbotButton({ style }: Props) {

    return (
        <Pressable style={style}>
            <Image style={styles.image} source={require('@/assets/images/chatbot.png')} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 15,
        width: 60,
        height: 60,
    }
});