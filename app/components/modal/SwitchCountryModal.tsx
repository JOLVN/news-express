import { StyleSheet } from 'react-native';
import ThemedText from '@/components/ui/ThemedText';
import { useContext } from 'react';
import { ModalContext } from '@/contexts/ModalContext';
import ModalOption from '@/components/modal/ModalOption';
import { LanguageContext } from '@/contexts/LanguageContext';
import { Texts } from '@/constants/Texts';
import BottomSheetModal from '@/components/modal/BottomSheetModal';

export default function SwitchCountryModal() {

    const { isCountryModalVisible, hideCountryModal } = useContext(ModalContext);
    const { language, changeLanguage } = useContext(LanguageContext);

    return (
        <BottomSheetModal isVisible={isCountryModalVisible} hideModal={hideCountryModal}>
            <ThemedText variant="title" style={styles.title}>{Texts[language].country}</ThemedText>
            
            <ModalOption 
                title={Texts[language].usa} 
                selected={language === 'en'}
                onPress={() => {
                    changeLanguage('en');
                }}
            />
            
            <ModalOption 
                title={Texts[language].france}
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