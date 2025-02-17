import { StyleSheet } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';
import ModalOption from '@/components/modal/ModalOption';
import { LanguageContext } from '@/contexts/LanguageContext';
import { Texts } from '@/constants/Texts';
import BottomSheetModal from '@/components/modal/BottomSheetModal';

export default function SwitchLanguageModal() {

    const { isLanguageModalVisible, hideLanguageModal } = useContext(ModalContext);
    const { language, changeLanguage } = useContext(LanguageContext);

    return (
        <BottomSheetModal isVisible={isLanguageModalVisible} hideModal={hideLanguageModal}>
            <ThemedText variant="title" style={styles.title}>{Texts[language].language}</ThemedText>
            
            <ModalOption 
                title={Texts[language].english} 
                selected={language === 'en'}
                onPress={() => {
                    changeLanguage('en');
                }}
            />
            
            <ModalOption 
                title={Texts[language].french}
                selected={language === 'fr'}
                onPress={() => {
                    changeLanguage('fr');  
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