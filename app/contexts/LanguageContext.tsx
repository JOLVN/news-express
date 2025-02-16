import { Language } from "@/types/languages";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

interface LanguageContextProps {
    language: Language;
    changeLanguage: (language: Language) => void;
}

export const LanguageContext = createContext<LanguageContextProps>({
    language: 'en',
    changeLanguage: () => {},
});

type Props = {
    children: React.ReactNode;
}

export function LanguageContextProvider({children}: Props) {

    const [language, setLanguage] = useState<Language>('en');

    useEffect(() => {
        loadLanguagePreferences();
    }, []);

    useEffect(() => {
        saveLanguagePreferences();
    }, [language]);

    const loadLanguagePreferences = async () => {
        try {
            const savedPreferences = await AsyncStorage.getItem('userLanguage');
            if (savedPreferences) {
                const { language: savedLanguage } = JSON.parse(savedPreferences);
                setLanguage(savedLanguage);
            }
        } catch (error) {
            console.error('Error while loading language preferences:', error);
        }
    };

    const saveLanguagePreferences = async () => {
        try {
            const preferences = JSON.stringify({
                language
            });
            await AsyncStorage.setItem('userLanguage', preferences);
        } catch (error) {
            console.error('Error while saving theme preferences:', error);
        }
    };

    function changeLanguage(language: Language) {
        setLanguage(language);
    }

    const values = {
        language,
        changeLanguage,
    }

    return (
        <LanguageContext.Provider value={values}>
            {children}
        </LanguageContext.Provider>
    )
}