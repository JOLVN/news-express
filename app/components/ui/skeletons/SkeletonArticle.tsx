import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";
import Animated, { 
    useAnimatedStyle, 
    withRepeat, 
    withSequence, 
    withTiming 
} from "react-native-reanimated";

export default function SkeletonArticle() {
    const colors = useThemeColors();

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(
            withSequence(
                withTiming(0.3, { duration: 500 }),
                withTiming(1, { duration: 500 })
            ),
            -1,
            true
        )
    }));

    const skeletonBaseStyle = {
        backgroundColor: colors.gray600,
    };

    return (
        <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>
            <Animated.View style={[styles.title, skeletonBaseStyle, animatedStyle]} />
            <Animated.View style={[styles.image, skeletonBaseStyle, animatedStyle]} />
            <Animated.View style={[styles.paragraph, skeletonBaseStyle, animatedStyle]} />
            
            {/* Section Context */}
            <Animated.View style={[styles.sectionTitle, skeletonBaseStyle, animatedStyle]} />
            <Animated.View style={[styles.paragraph, skeletonBaseStyle, animatedStyle]} />
            
            {/* Section Details */}
            <Animated.View style={[styles.sectionTitle, skeletonBaseStyle, animatedStyle]} />
            <Animated.View style={[styles.paragraph, skeletonBaseStyle, animatedStyle]} />
            
            {/* Section Issues */}
            <Animated.View style={[styles.sectionTitle, skeletonBaseStyle, animatedStyle]} />
            <Animated.View style={[styles.paragraph, skeletonBaseStyle, animatedStyle]} />
            
            {/* Section Conclusion */}
            <Animated.View style={[styles.sectionTitle, skeletonBaseStyle, animatedStyle]} />
            <Animated.View style={[styles.paragraph, skeletonBaseStyle, animatedStyle]} />
            
            {/* Questions */}
            <Animated.View style={[styles.sectionTitle, skeletonBaseStyle, animatedStyle]} />
            <View style={styles.questions}>
                {[1, 2, 3].map((_, index) => (
                    <Animated.View 
                        key={index} 
                        style={[styles.question, skeletonBaseStyle, animatedStyle]} 
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 30,
    },
    title: {
        height: 40,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    sectionTitle: {
        height: 30,
        width: '50%',
        borderRadius: 8,
        marginBottom: 10,
    },
    paragraph: {
        height: 100,
        borderRadius: 8,
    },
    questions: {
        gap: 10,
    },
    question: {
        height: 60,
        borderRadius: 8,
    },
});