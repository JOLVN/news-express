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
import SwitchCountryModal from "@/components/modal/SwitchCountryModal";
import { ReadArticlesContextProvider } from "@/contexts/ReadArticlesContext";
import { PurchasesService } from "@/services/Purchases";
import { CreditsContext, CreditsContextProvider } from "@/contexts/CreditsContext";
import { BookmarksContext, BookmarksContextProvider } from "@/contexts/BookmarksContext";
import { CreditsService } from "@/services/Credits";
import { getUserDataFromFirebase } from "@/functions/API";
import { BookmarksService } from "@/services/Bookmarks";
import { UserIdService } from "@/services/UserId";
import { UserDataContext, UserDataContextProvider } from "@/contexts/UserDataContext";
import SubscriptionPremiumModal from "@/components/modal/SubscriptionModal";

SplashScreen.preventAutoHideAsync();

function Root() {

    const { theme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);
    const { setCredits, refreshCredits } = useContext(CreditsContext);
    const { setUserId, setIsSubscribed, setIsTrialEligible } = useContext(UserDataContext);
    const { setBookmarks } = useContext(BookmarksContext);
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

    
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        
    }, []);

    // Load saved credits at startup
    useEffect(() => {        
        const initialize = async () => {
            GoogleTTSService.initialize();
            await PurchasesService.initialize();

            // Handle user id
            let userId = await UserIdService.getUserId();
            if (userId) {
                setUserId(userId);
            } else {
                userId = await PurchasesService.getRCUserId();
                await UserIdService.setUserId(userId);
                setUserId(userId);
                
            }
            // Handle isSubscribed and isTrialEligible
            const { isTrialEligible, isSubscribed } = await PurchasesService.checkSubscriptionStatus();
            setIsSubscribed(isSubscribed);
            setIsTrialEligible(isTrialEligible);
            const userData = await getUserDataFromFirebase(userId);
            // Handle credits
            const savedCredits = await CreditsService.getCredits();
            if (savedCredits) {
                setCredits(savedCredits);
            } else {
                if (userData.credits) {
                    setCredits(userData.credits);
                    await CreditsService.setCredits(userData.credits);
                }
            }
            // Handle bookmarks
            const bookmarks = await BookmarksService.getBookmarksArticleIds();
            if (bookmarks) {
                setBookmarks(bookmarks);
            } else {
                if (userData.bookmarks) {
                    setBookmarks(userData.bookmarks);
                    await BookmarksService.setBookmarksArticleIds(userData.bookmarks);
                }
            }
            // Refresh credits
            await refreshCredits();
        };

        initialize();
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
                <Stack.Screen name="paywall" options={{ 
                    title: '',
                 }} />
                <Stack.Screen name="bookmarks" options={{ 
                    title: Texts[language].bookmarks,
                 }} />
                <Stack.Screen name="aboutCredits" options={{ 
                    title: Texts[language].credits,
                 }} />
                <Stack.Screen name="chatbot/[id]" options={{ 
                    title: "",
                    headerShown: false,
                    presentation: 'modal',
                 }} />
                <Stack.Screen name="privacyPolicy" options={{ 
                    title: Texts[language].privacyPolicy,
                 }} />
            </Stack>
            <SwitchThemeModal />
            <SwitchCountryModal />
            <SubscriptionPremiumModal />
        </>
    )
}

export default function RootLayout() {
    return (
        <UserDataContextProvider>
            <ThemeContextProvider>
                <LanguageContextProvider>
                    <ArticlesContextProvider>
                        <ReadArticlesContextProvider>
                            <BookmarksContextProvider>
                                <CreditsContextProvider>
                                    <CategoriesContextProvider>
                                        <ModalContextProvider>
                                            <GestureHandlerRootView style={{ flex: 1 }}>
                                                <BottomSheetModalProvider>
                                                    <Root />
                                                </BottomSheetModalProvider>
                                            </GestureHandlerRootView>
                                        </ModalContextProvider>
                                    </CategoriesContextProvider>
                                </CreditsContextProvider>
                            </BookmarksContextProvider>
                        </ReadArticlesContextProvider>
                    </ArticlesContextProvider>
                </LanguageContextProvider>
            </ThemeContextProvider>
        </UserDataContextProvider>
    );
}
