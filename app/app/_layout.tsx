import { ThemeContext, ThemeContextProvider } from "@/contexts/ThemeContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import { PTSerif_400Regular, PTSerif_700Bold, PTSerif_700Bold_Italic, PTSerif_400Regular_Italic } from "@expo-google-fonts/pt-serif";
import { Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from "@expo-google-fonts/montserrat";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ArticlesContextProvider } from "@/contexts/ArticlesContext";
import { CategoriesContextProvider } from "@/contexts/CategoriesContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ModalContextProvider } from "@/contexts/ModalContext";
import SwitchThemeModal from "@/components/modal/SwitchThemeModal";
import { GoogleTTSService } from "@/services/GoogleTTS";
import { LanguageContext, LanguageContextProvider } from "@/contexts/LanguageContext";
import { Texts } from "@/constants/Texts";
import SwitchLanguageModal from "@/components/modal/SwitchLanguageModal";
import { ReadArticlesContextProvider } from "@/contexts/ReadArticlesContext";
import { PurchasesService } from "@/services/Purchases";
import { AccessibilityInfo } from "react-native";

SplashScreen.preventAutoHideAsync();

function Root() {

    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
    const colors = useThemeColors();
    const [loaded] = useFonts({
        'PTSerif-Regular': PTSerif_400Regular,
        'PTSerif-RegularItalic': PTSerif_400Regular_Italic,
        'PTSerif-Bold': PTSerif_700Bold,
        'PTSerif-BoldItalic': PTSerif_700Bold_Italic,
        'Montserrat-Regular': Montserrat_400Regular,
        'Montserrat-Medium': Montserrat_500Medium,
        'Montserrat-SemiBold': Montserrat_600SemiBold,
        'Montserrat-Bold': Montserrat_700Bold,
    });

    const [fontScale, setFontScale] = useState(1);

    useEffect(() => {
        AccessibilityInfo.addEventListener(
            'change',
            (event) => {
                setFontScale(1); // Rétablir la taille de texte fixe
            }
        );

        // return () => {
        //     AccessibilityInfo.removeEventListener(
        //         'change',
        //         (event) => {
        //         setFontScale(1); // Rétablir la taille de texte fixe
        //         }
        //     );
        // };
    }, []);

    
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        GoogleTTSService.initialize();
        PurchasesService.initialize();
    }, []);
    
    if (!loaded) {
        return null;
    }

    return (
        <>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ 
                headerStyle: {
                    backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                headerTitleStyle: {
                    fontFamily: 'Montserrat-Medium',
                }
            }}>
                <Stack.Screen name="index" options={{ 
                    headerShown: false,
                    title: Texts[language].home,
                }} />
                <Stack.Screen name="article/[id]" options={{ 
                    title: "",
                 }} />
                <Stack.Screen name="settings" options={{ 
                    title: Texts[language].settings,
                 }} />
                <Stack.Screen name="upgrade" options={{ 
                    title: '',
                 }} />
                <Stack.Screen name="chatbot/[id]" options={{ 
                    title: "",
                    headerShown: false,
                    presentation: 'modal',
                 }} />
            </Stack>
            <SwitchThemeModal />
            <SwitchLanguageModal />
        </>
    )
}

export default function RootLayout() {
    return (
        <ThemeContextProvider>
            <LanguageContextProvider>
                <ArticlesContextProvider>
                    <ReadArticlesContextProvider>
                        <CategoriesContextProvider>
                            <ModalContextProvider>
                                <GestureHandlerRootView style={{ flex: 1 }}>
                                    <BottomSheetModalProvider>
                                        <Root />
                                    </BottomSheetModalProvider>
                                </GestureHandlerRootView>
                            </ModalContextProvider>
                        </CategoriesContextProvider>
                    </ReadArticlesContextProvider>
                </ArticlesContextProvider>
            </LanguageContextProvider>
        </ThemeContextProvider>
    );
}
