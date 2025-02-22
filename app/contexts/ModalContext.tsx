import { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isThemeModalVisible: boolean;
    showThemeModal: () => void;
    hideThemeModal: () => void;
    isCountryModalVisible: boolean;
    showCountryModal: () => void;
    hideCountryModal: () => void;
    isSubscriptionModalVisible: boolean;
    showSubscriptionModal: () => void;
    hideSubscriptionModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    isThemeModalVisible: false,
    showThemeModal: () => {},
    hideThemeModal: () => {},
    isCountryModalVisible: false,
    showCountryModal: () => {},
    hideCountryModal: () => {},
    isSubscriptionModalVisible: false,
    showSubscriptionModal: () => {},
    hideSubscriptionModal: () => {},
});

export function ModalContextProvider({ children }: { children: React.ReactNode }) {

    const [isThemeModalVisible, setThemeModalVisible] = useState(false);
    const [isCountryModalVisible, setCountryModalVisible] = useState(false);
    const [isSubscriptionModalVisible, setSubscriptionModalVisible] = useState(false);

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

    const showSubscriptionModal = () => {
        setSubscriptionModalVisible(true);
    }

    const hideSubscriptionModal = () => {
        setSubscriptionModalVisible(false);
    }

    const values = {
        isThemeModalVisible,
        showThemeModal,
        hideThemeModal,
        isCountryModalVisible,
        showCountryModal,
        hideCountryModal,
        isSubscriptionModalVisible,
        showSubscriptionModal,
        hideSubscriptionModal,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    );
}