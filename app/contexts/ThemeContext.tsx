import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

type Theme = 'light' | 'dark';

interface ThemeContextProps {
    theme: Theme;
    toggleTheme: () => void;
    isSystemTheme: boolean;
    setIsSystemTheme: (isSystemTheme: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    theme: 'dark',
    toggleTheme: () => {},
    isSystemTheme: false,
    setIsSystemTheme: () => {},
});

type Props = {
    children: React.ReactNode;
}

export function ThemeContextProvider({children}: Props) {

    const systemTheme = useColorScheme() as Theme;
    const [isSystemTheme, setIsSystemTheme] = useState(true);
    const [theme, setTheme] = useState<Theme>(systemTheme);

    useEffect(() => {
        loadThemePreferences();
    }, []);

    useEffect(() => {
        saveThemePreferences();
    }, [theme, isSystemTheme]);

    useEffect(() => {
        if (isSystemTheme) {
            setTheme(systemTheme);
        }
    }, [systemTheme, isSystemTheme]);

    const loadThemePreferences = async () => {
        try {
            const savedPreferences = await AsyncStorage.getItem('themePreferences');
            if (savedPreferences) {
                const { theme: savedTheme, isSystemTheme: savedIsSystemTheme } = JSON.parse(savedPreferences);
                setTheme(savedTheme);
                setIsSystemTheme(savedIsSystemTheme);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des préférences de thème:', error);
        }
    };

    const saveThemePreferences = async () => {
        try {
            const preferences = JSON.stringify({
                theme,
                isSystemTheme,
            });
            await AsyncStorage.setItem('themePreferences', preferences);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des préférences de thème:', error);
        }
    };

    function toggleTheme() {
        setIsSystemTheme(false);
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    const values = {
        theme,
        toggleTheme,
        isSystemTheme,
        setIsSystemTheme
    }

    return (
        <ThemeContext.Provider value={values}>
            {children}
        </ThemeContext.Provider>
    )
}