import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    withRepeat, 
    withSequence, 
    withTiming,
    useSharedValue, 
    withDelay
} from 'react-native-reanimated';

interface AudioWaveProps {
    isPlaying: boolean;
    color?: string;
    size?: number;
}

export const AudioWave = ({ isPlaying, color = '#000', size = 30 }: AudioWaveProps) => {
    const numberOfBars = 6;
    const bars = Array(numberOfBars).fill(0).map(() => useSharedValue(1));

    React.useEffect(() => {
        if (isPlaying) {
            bars.forEach((bar, index) => {
                bar.value = withRepeat(
                    withDelay(
                        index * 100,
                        withSequence(
                        withTiming(1.5, { duration: 300 }),
                        withTiming(0.5, { duration: 300 }),
                        withTiming(1, { duration: 300 })
                        )
                    ),
                    -1
                );
        });
        } else {
        bars.forEach(bar => {
            bar.value = withTiming(1);
        });
        }
    }, [isPlaying]);

    const barStyles = bars.map(bar => 
        useAnimatedStyle(() => ({
            transform: [{ scaleY: bar.value }]
        }))
    );

  return (
    <View style={styles.container}>
        {barStyles.map((style, index) => (
            <Animated.View
                key={index}
                style={[
                    styles.bar,
                    style,
                    { 
                    backgroundColor: color,
                    width: size / 8,
                    height: size,
                    marginHorizontal: size / 16
                    }
                ]}
            />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bar: {
        borderRadius: 50,
    },
});
