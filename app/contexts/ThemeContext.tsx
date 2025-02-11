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
        if (isSystemTheme) {
            setTheme(systemTheme);
        }
    }, [systemTheme, isSystemTheme]);

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