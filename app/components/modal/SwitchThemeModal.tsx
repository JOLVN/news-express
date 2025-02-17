import { StyleSheet } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { ModalContext } from '@/contexts/ModalContext';
import ModalOption from '@/components/modal/ModalOption';
import { LanguageContext } from '@/contexts/LanguageContext';
import { Texts } from '@/constants/Texts';
import BottomSheetModal from '@/components/modal/BottomSheetModal';

export default function SwitchThemeModal() {

    const { isThemeModalVisible, hideThemeModal } = useContext(ModalContext);
    const { theme, toggleTheme, isSystemTheme, setIsSystemTheme } = useContext(ThemeContext);
    const { language } = useContext(LanguageContext);

    return (
        <BottomSheetModal isVisible={isThemeModalVisible} hideModal={hideThemeModal}>
            <ThemedText variant="title" style={styles.title}>{Texts[language].appearance}</ThemedText>
            
            <ModalOption 
                title={Texts[language].system} 
                selected={isSystemTheme}
                onPress={() => {
                    setIsSystemTheme(true);
                }}
            />
            
            <ModalOption 
                title={Texts[language].light}
                selected={!isSystemTheme && theme === 'light'}
                onPress={() => {
                    setIsSystemTheme(false);
                    if (theme === 'dark') toggleTheme();
                }}
            />
            
            <ModalOption 
                title={Texts[language].dark} 
                selected={!isSystemTheme && theme === 'dark'}
                onPress={() => {
                    setIsSystemTheme(false);
                    if (theme === 'light') toggleTheme();
                }}
            />
        </BottomSheetModal>
    );
}

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        marginVertical: 12,
        marginBottom: 24,
    },
    
});