import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';

type Props = {
    onSwipeStart: () => void;
    style?: object;
}

export default function EdgeDetector({ onSwipeStart, style }: Props) {
    const gesture = Gesture.Pan()
        .onStart((event) => {
            if (event.x < 100) {
                runOnJS(onSwipeStart)()
            }
        });

    return (
        <GestureDetector gesture={gesture}>
            <Animated.View style={[styles.container, style]} />
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 100,
    },
});