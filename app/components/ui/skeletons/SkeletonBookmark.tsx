import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withDelay, withRepeat, withSequence, withTiming } from "react-native-reanimated";

type Props = {
    spacing: number;
    size: number;
    index?: number;
}

export default function SkeletonBookmark({ spacing, size, index = 0 }: Props) {
    const colors = useThemeColors();

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: withRepeat(
            withSequence(
                withDelay(
                    index * 100,
                    withTiming(0.3, { duration: 500 })
                ),
                withTiming(1, { duration: 500 })
            ),
            -1,
            true
        )
    }));

    return (
        <View style={{ width: size, height: size, margin: spacing }}>
            <Animated.View 
                style={[
                    styles.skeleton, 
                    { backgroundColor: colors.gray600 },
                    animatedStyle
                ]} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    skeleton: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
});