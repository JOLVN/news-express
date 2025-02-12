import { Question } from "@/types/types"
import { Pressable, StyleSheet, View } from "react-native"
import ThemedText from "@/components/ui/ThemedText"
import { Entypo } from '@expo/vector-icons';
import { useThemeColors } from "@/hooks/useThemeColors";
import { useState, useCallback } from 'react';
import Animated, { 
    useAnimatedStyle, 
    withSpring,
    useSharedValue,
    interpolate,
} from 'react-native-reanimated';

type Props = {
    question: Question
}

export default function ArticleQuestion({question}: Props) {
    const colors = useThemeColors();
    const [isExpanded, setIsExpanded] = useState(false);
    const contentHeight = useSharedValue(0);
    const animation = useSharedValue(0);

    const measureContent = useCallback((event: any) => {
        contentHeight.value = event.nativeEvent.layout.height;
    }, []);

    const toggleAccordion = () => {
        animation.value = withSpring(isExpanded ? 0 : 1);
        setIsExpanded(!isExpanded);
    };

    const iconStyle = useAnimatedStyle(() => ({
        transform: [{
            rotate: `${interpolate(animation.value, [0, 1], [0, 180])}deg`,
        }],
    }));

    const contentStyle = useAnimatedStyle(() => ({
        height: interpolate(
            animation.value,
            [0, 1],
            [0, contentHeight.value]
        ),
        opacity: animation.value,
    }));

    return (
        <View style={styles.container}>
            <Pressable onPress={toggleAccordion}>
                <View style={[styles.questionContainer, {borderColor: colors.text}]}>
                    <ThemedText variant={'articleQuestion'} style={styles.question}>
                        {question.question}
                    </ThemedText>
                    <Animated.View style={iconStyle}>
                        <Entypo name="chevron-thin-down" size={28} color={colors.text} />
                    </Animated.View>
                </View>
            </Pressable>
            <Animated.View style={[styles.answerContainer, contentStyle]}>
                <View style={styles.measureView} onLayout={measureContent}>
                    <ThemedText variant={'articleQuestion'} style={styles.answer}>{question.answer}</ThemedText>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
    },
    questionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 40,
        paddingBottom: 10,
        borderBottomWidth: 1,
    },
    question: {
        flex: 1,
    },
    answerContainer: {
        overflow: 'hidden',
    },
    answer: {
        paddingTop: 10,
    },
    measureView: {
        position: 'absolute',
        width: '100%',
    },
});