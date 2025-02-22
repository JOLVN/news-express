import { Language } from "@/types/languages";
import { createContext, useEffect, useState } from "react";
import { UserLanguageService } from '@/services/UserLanguage';

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
            const savedPreferences = await UserLanguageService.getUserLanguage();
            if (savedPreferences) {
                const { language: savedLanguage } = savedPreferences;
                setLanguage(savedLanguage);
            } else {
                // Set the language based on the device's language
                const deviceLanguage = Intl.DateTimeFormat().resolvedOptions().locale;
                const primaryLanguage = deviceLanguage.split('-')[0];
                setLanguage(primaryLanguage === 'fr' ? 'fr' : 'en');
            }
        } catch (error) {
            console.error('Error while loading language preferences:', error);
        }
    };

    const saveLanguagePreferences = async () => {
        try {
            await UserLanguageService.setUserLanguage(language);
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