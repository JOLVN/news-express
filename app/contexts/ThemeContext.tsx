import { createContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { UserThemeService } from '@/services/UserTheme';

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
            const savedPreferences = await UserThemeService.getUserTheme();
            if (savedPreferences) {
                const { theme: savedTheme, isSystemTheme: savedIsSystemTheme } = savedPreferences;
                setTheme(savedTheme);
                setIsSystemTheme(savedIsSystemTheme);
            }
        } catch (error) {
            console.error('Error while loading theme preferences:', error);
        }
    };

    const saveThemePreferences = async () => {
        try {
            const preferences = {
                theme,
                isSystemTheme,
            };
            await UserThemeService.setUserTheme(preferences);
        } catch (error) {
            console.error('Error while saving theme preferences:', error);
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