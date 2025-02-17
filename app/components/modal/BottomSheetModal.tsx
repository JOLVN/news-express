import { Pressable, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useEffect } from 'react';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useThemeColors } from '@/hooks/useThemeColors';

type Props = {
    children: React.ReactNode;
    isVisible: boolean;
    hideModal: () => void;
}

export default function BottomSheetModal({children, isVisible, hideModal}: Props) {

    const colors = useThemeColors();
    const opacity = useSharedValue(0);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['50%', '75%', '100%'], []);

    useEffect(() => {
        if (isVisible) {
            opacity.value = withTiming(0.5, { duration: 200 });
        }
    }, [isVisible]);

    const handleSheetChanges = useCallback((index: number) => {        
        if (index === -1) {
            opacity.value = withTiming(0, { duration: 200 }, (finished) => {
                if (finished) {
                    runOnJS(hideModal)();
                }
            });
        }
    }, [hideModal]);

    const closeSheet = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const handleClose = useCallback(() => {
        opacity.value = withTiming(0, { duration: 200 }, (finished) => {
            if (finished) {
                runOnJS(closeSheet)();
            }
        });
    }, []);

    const backdropAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    if (!isVisible) return null;

    function BackdropComponent() {
        return (
            <Animated.View style={[
                StyleSheet.absoluteFillObject,
                { backgroundColor: 'black' },
                backdropAnimatedStyle
            ]}>
                <Pressable 
                    style={StyleSheet.absoluteFillObject}
                    onPress={handleClose}
                />
            </Animated.View>
        );
    }

    return (
        <BottomSheet 
            ref={bottomSheetRef}
            style={styles.contentContainer} 
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={true}
            backgroundStyle={{ backgroundColor: colors.background }}
            handleIndicatorStyle={{ backgroundColor: colors.text, width: 60 }}
            backdropComponent={BackdropComponent}
            animateOnMount={true}
        >
            <BottomSheetView style={styles.modalContent}>
                {children}
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
    },
    modalContent: {
        paddingHorizontal: 20,
        paddingBottom: 50,
        gap: 20,
    },    
});