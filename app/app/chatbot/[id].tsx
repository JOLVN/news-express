import ChatMessage from "@/components/ChatMessage";
import CloseButton from "@/components/ui/buttons/CloseButton";
import ChatInput from "@/components/ui/ChatInput";
import ThemedText from "@/components/ui/ThemedText";
import { ArticlesContext } from "@/contexts/ArticlesContext";
import { getChatbotResponse } from "@/functions/API";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Message } from "@/types/chat";
import { router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Image as ExpoImage } from 'expo-image';
import ChatMessageLoading from "@/components/ChatMessageLoading";

export default function Chatbot() {

    const { getArticleById } = useContext(ArticlesContext);
    const { id } = useLocalSearchParams();
    const article = getArticleById(id as string);
    const colors = useThemeColors();

    const [isMounted, setIsMounted] = useState(false);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const flatListRef = useRef<FlatList>(null);


    const handleGoBack = () => {
        router.back();
    };

    const scrollToBottom = () => {
        flatListRef.current?.scrollToEnd({ animated: true });
    };

    

    async function sendMessage() {
        if (!article || !inputText) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isUser: true,
            timestamp: new Date()
        };
        
        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        
        try {
            setIsLoading(true);
            const response = await getChatbotResponse(article.url, inputText);
            const apiMessage: Message = {
                id: Date.now().toString(),
                text: response,
                isUser: false,
                timestamp: new Date()
            };
            
            setMessages(prev => [...prev, apiMessage]);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    // Solve bug on IOS -> Sometimes the content not takes the full height
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMounted(true);
        }, 50);
        return () => clearTimeout(timer);
    }, []);

    if (!isMounted) {
        return (
            <View style={[styles.container, {backgroundColor: colors.coloredBackground}]} />
        )
    }

    if (!article) {
        return (
            <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
                <ThemedText>Article introuvable</ThemedText>
            </View>
        )
    }

    return (
        <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
            <CloseButton onPress={handleGoBack} style={styles.closeButton} />

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -25}
            >
                <View style={styles.content}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={({item: message}) => (
                            <ChatMessage message={message} />
                        )}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={[styles.messagesContainer, messages.length === 0 && styles.emptyMessagesContainer]}
                        onContentSizeChange={scrollToBottom}
                        ListEmptyComponent={
                            <View style={[styles.emptyContainer]}>
                                <ExpoImage
                                    style={styles.emptyImage} 
                                    source={require('@/assets/images/chatbot.png')} 
                                    contentFit="contain"
                                    cachePolicy="memory-disk"
                                />
                            </View>
                        }
                        ListFooterComponent={
                            isLoading ? (
                                <ChatMessageLoading />
                            ) : null
                        }
                    />
                    
                    <ChatInput 
                        style={styles.chatInput}
                        value={inputText}
                        onInput={(text) => setInputText(text)} 
                        onSubmit={sendMessage}
                    />
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80,
        width: '100%',
    },
    closeButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 20 : 30,
        left: 20,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Platform.OS === 'ios' ? 30 : 20,
    },
    messagesContainer: {
        paddingBottom: 40,
    },
    emptyMessagesContainer: {
        flex: 1,
        height: '100%',
    },
    chatInput: {
        paddingBottom: Platform.OS === 'ios' ? 120 : 40,
        minWidth: Dimensions.get('window').width - 40,
        maxWidth: Dimensions.get('window').width - 40,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyImage: {
        width: 60,
        height: 60,
        borderRadius: 15,
    }
});