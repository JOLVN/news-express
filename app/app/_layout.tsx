import { ThemeContext, ThemeContextProvider } from "@/contexts/ThemeContext";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { PTSerif_400Regular, PTSerif_700Bold, PTSerif_700Bold_Italic, PTSerif_400Regular_Italic } from "@expo-google-fonts/pt-serif";
import { Montserrat_400Regular, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ArticlesContextProvider } from "@/contexts/ArticlesContext";
import { CategoriesContext, CategoriesContextProvider } from "@/contexts/CategoriesContext";
import categories from "@/data/categories.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ModalContextProvider } from "@/contexts/ModalContext";
import SwitchThemeModal from "@/components/SwitchThemeModal";
import { GoogleTTSService } from "@/services/GoogleTTS";
import { LanguageContext, LanguageContextProvider } from "@/contexts/LanguageContext";
import { Texts } from "@/constants/Texts";

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
    });
    const { setCategories } = useContext(CategoriesContext);
    
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        GoogleTTSService.initialize();
    }, []);

    useEffect(() => {
        setCategories(categories);
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
                    title: "Paramètres",
                 }} />
                <Stack.Screen name="chatbot/[id]" options={{ 
                    title: "",
                    headerShown: false,
                    presentation: 'modal',
                 }} />
            </Stack>
            <SwitchThemeModal />
        </>
    )
}

export default function RootLayout() {
    return (
        <ThemeContextProvider>
            <LanguageContextProvider>
                <ArticlesContextProvider>
                    <CategoriesContextProvider>
                        <ModalContextProvider>
                            <GestureHandlerRootView style={{ flex: 1 }}>
                                <BottomSheetModalProvider>
                                    <Root />
                                </BottomSheetModalProvider>
                            </GestureHandlerRootView>
                        </ModalContextProvider>
                    </CategoriesContextProvider>
                </ArticlesContextProvider>
            </LanguageContextProvider>
        </ThemeContextProvider>
    );
}
