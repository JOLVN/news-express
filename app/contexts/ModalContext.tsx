import { createContext, useContext, useState } from 'react';

interface ModalContextType {
    isThemeModalVisible: boolean;
    showThemeModal: () => void;
    hideThemeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
    isThemeModalVisible: false,
    showThemeModal: () => {},
    hideThemeModal: () => {},
});

export function ModalContextProvider({ children }: { children: React.ReactNode }) {

    const [isThemeModalVisible, setThemeModalVisible] = useState(false);

    const showThemeModal = () => {
        setThemeModalVisible(true);
    }
    const hideThemeModal = () => setThemeModalVisible(false);

    const values = {
        isThemeModalVisible,
        showThemeModal,
        hideThemeModal,
    }

    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    );
}