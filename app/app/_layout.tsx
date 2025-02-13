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
import { Category } from "@/types/categories";

function Root() {

    const { theme } = useContext(ThemeContext);
    const colors = useThemeColors();
    const [loaded] = useFonts({
        'PTSerif-Regular': PTSerif_400Regular,
        'PTSerif-RegularItalic': PTSerif_400Regular_Italic,
        'PTSerif-Bold': PTSerif_700Bold,
        'PTSerif-BoldItalic': PTSerif_700Bold_Italic,
        'Montserrat-Regular': Montserrat_400Regular,
        'Montserrat-Medium': Montserrat_500Medium,
    });
    // TODO: use async storage to store user categories
    const userCategories = categories;
    const { setCategories, setUserCategories } = useContext(CategoriesContext);
    
    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        setCategories(categories);
        setUserCategories(userCategories);
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
                    title: "Home",
                }} />
                <Stack.Screen name="article/[id]" options={{ 
                    title: "",
                 }} />
            </Stack>
        </>
    )
}

export default function RootLayout() {
    return (
        <ThemeContextProvider>
            <ArticlesContextProvider>
                <CategoriesContextProvider>
                    <Root />
                </CategoriesContextProvider>
            </ArticlesContextProvider>
        </ThemeContextProvider>
    );
}
