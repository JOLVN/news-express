import { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isThemeModalVisible: boolean;
    showThemeModal: () => void;
    hideThemeModal: () => void;
    isCountryModalVisible: boolean;
    showCountryModal: () => void;
    hideCountryModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    isThemeModalVisible: false,
    showThemeModal: () => {},
    hideThemeModal: () => {},
    isCountryModalVisible: false,
    showCountryModal: () => {},
    hideCountryModal: () => {},
});

export function ModalContextProvider({ children }: { children: React.ReactNode }) {

    const [isThemeModalVisible, setThemeModalVisible] = useState(false);
    const [isCountryModalVisible, setCountryModalVisible] = useState(false);

    const showThemeModal = () => {
        setThemeModalVisible(true);
    }
    const hideThemeModal = () => setThemeModalVisible(false);

    const showCountryModal = () => {
        setCountryModalVisible(true);
    }

    const hideCountryModal = () => {
        setCountryModalVisible(false);
    }

    const values = {
        isThemeModalVisible,
        showThemeModal,
        hideThemeModal,
        isCountryModalVisible,
        showCountryModal,
        hideCountryModal,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    );
}