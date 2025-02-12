import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, useColorScheme, View } from "react-native";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get('window').width;

interface CustomDrawerProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function CustomDrawer({ isVisible, onClose, children }: CustomDrawerProps) {

    const colors = useThemeColors();
    const [isRendered, setIsRendered] = useState(false);
    const translateX = useSharedValue(-SCREEN_WIDTH);
    const opacity = useSharedValue(0);
    const theme = useColorScheme() ?? "dark";

    useEffect(() => {
        if (isVisible) {
            setIsRendered(true);
            translateX.value = withSpring(0, {
                damping: 20,
                stiffness: 90,
            });
            opacity.value = withTiming(1, { duration: 300 });
        } else {
            translateX.value = withTiming(-SCREEN_WIDTH, { duration: 300 }, (finished) => {
                // Callback when animation is finished
                if (finished) {
                  runOnJS(setIsRendered)(false);
                }
              });
            opacity.value = withTiming(0, { duration: 300 });
        }
    }, [isVisible]);

    const drawerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }],
        };
    });

    const overlayAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    if (!isRendered) return null;

    return (
        <View style={styles.container}>
            <Animated.View 
                style={[styles.drawer, drawerAnimatedStyle, {...Shadows[theme].medium}, { backgroundColor: colors.background }]}
            >
                {children}
            </Animated.View>
            <Animated.View 
                style={[styles.overlay, overlayAnimatedStyle]}
                onTouchStart={onClose}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1000,
    },
    drawer: {
        ...StyleSheet.absoluteFillObject,
        width: '80%',
        zIndex: 1001,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
});