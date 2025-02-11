import { View, Switch, Text, StyleSheet } from 'react-native';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useContext } from 'react';

export default function ThemeSwitch() {
    const { theme, toggleTheme, isSystemTheme, setIsSystemTheme } = useContext(ThemeContext);
    const colors = useThemeColors();

    return (
        <View style={styles.container}>
        <View style={styles.switchContainer}>
            <Text style={[styles.text, { color: colors.grayDark }]}>
            Mode sombre
            </Text>
            <Switch
                value={theme === 'dark'}
                onValueChange={toggleTheme}
                trackColor={{ false: colors.grayLight, true: colors.accent }}
                thumbColor="white"
            />
        </View>
        
        <View style={styles.switchContainer}>
            <Text style={[styles.text, { color: colors.grayDark }]}>
            Utiliser le thème système
            </Text>
            <Switch
                value={isSystemTheme}
                onValueChange={setIsSystemTheme}
                trackColor={{ false: colors.grayLight, true: colors.accent }}
                thumbColor="white"
            />
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 8,
    },
    text: {
        fontSize: 16,
    },
});