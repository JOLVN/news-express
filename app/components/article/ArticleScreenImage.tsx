import { useThemeColors } from "@/hooks/useThemeColors";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
    image?: string;
}

export default function ArticleScreenImage({ image }: Props) {

    const colors = useThemeColors();
    const opacity = useSharedValue(0);

    useEffect(() => {
        opacity.value = 0;
    }, [image]);

    const handleLoadEnd = () => {
        opacity.value = 0;
        opacity.value = withTiming(1, {
            duration: 1000,
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <View style={styles.imageContainer}>
            {image && (
                <Animated.Image
                    source={{ uri: image, cache: 'reload' }}
                    style={[styles.image, animatedStyle]}
                    onLoadEnd={handleLoadEnd}
                />
                
            )}
            <LinearGradient
                colors={['rgba(80,80,80,0.5)', 'transparent', 'transparent', 'rgba(80,80,80,0.5)']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                locations={[0, 0.4, 0.6, 1]}
                style={styles.gradient}
            />
            <LinearGradient
                colors={['transparent', colors.coloredBackground]}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.bottomGradient}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    imageContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '65%',
    },
    image: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    bottomGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '60%',
        bottom: 0,
    },
});