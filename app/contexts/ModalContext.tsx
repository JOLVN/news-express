import { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isThemeModalVisible: boolean;
    showThemeModal: () => void;
    hideThemeModal: () => void;
    isLanguageModalVisible: boolean;
    showLanguageModal: () => void;
    hideLanguageModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    isThemeModalVisible: false,
    showThemeModal: () => {},
    hideThemeModal: () => {},
    isLanguageModalVisible: false,
    showLanguageModal: () => {},
    hideLanguageModal: () => {},
});

export function ModalContextProvider({ children }: { children: React.ReactNode }) {

    const [isThemeModalVisible, setThemeModalVisible] = useState(false);
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

    const showThemeModal = () => {
        setThemeModalVisible(true);
    }
    const hideThemeModal = () => setThemeModalVisible(false);

    const showLanguageModal = () => {
        setLanguageModalVisible(true);
    }

    const hideLanguageModal = () => {
        setLanguageModalVisible(false);
    }

    const values = {
        isThemeModalVisible,
        showThemeModal,
        hideThemeModal,
        isLanguageModalVisible,
        showLanguageModal,
        hideLanguageModal,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    );
}