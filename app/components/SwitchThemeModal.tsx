import { Pressable, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ThemedText from './ui/ThemedText';
import { useContext, useCallback, useMemo, useRef, useEffect } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { ModalContext } from '@/contexts/ModalContext';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import ThemeOption from '@/components/ui/ThemeOption';
import { useThemeColors } from '@/hooks/useThemeColors';
import { LanguageContext } from '@/contexts/LanguageContext';
import { Texts } from '@/constants/Texts';

export default function SwitchThemeModal() {

    const { isThemeModalVisible, hideThemeModal } = useContext(ModalContext);
    const { theme, toggleTheme, isSystemTheme, setIsSystemTheme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
    const colors = useThemeColors();
    const opacity = useSharedValue(0);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['50%', '75%', '100%'], []);

    useEffect(() => {
        if (isThemeModalVisible) {
            opacity.value = withTiming(0.5, { duration: 200 });
        }
    }, [isThemeModalVisible]);

    const handleSheetChanges = useCallback((index: number) => {
        if (index === -1) {
            opacity.value = withTiming(0, { duration: 200 }, (finished) => {
                if (finished) {
                    runOnJS(hideThemeModal)();
                }
            });
        }
    }, [hideThemeModal]);

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

    if (!isThemeModalVisible) return null;

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
                <ThemedText variant="title" style={styles.title}>{Texts[language].appearance}</ThemedText>
                
                <ThemeOption 
                    title={Texts[language].system} 
                    selected={isSystemTheme}
                    onPress={() => {
                        setIsSystemTheme(true);
                        handleClose();
                    }}
                />
                
                <ThemeOption 
                    title={Texts[language].light}
                    selected={!isSystemTheme && theme === 'light'}
                    onPress={() => {
                        setIsSystemTheme(false);
                        if (theme === 'dark') toggleTheme();
                        handleClose();
                    }}
                />
                
                <ThemeOption 
                    title={Texts[language].dark} 
                    selected={!isSystemTheme && theme === 'dark'}
                    onPress={() => {
                        setIsSystemTheme(false);
                        if (theme === 'light') toggleTheme();
                        handleClose();
                    }}
                />
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
    title: {
        textAlign: 'center',
        marginVertical: 12,
        marginBottom: 24,
    },
    
});