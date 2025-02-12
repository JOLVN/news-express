import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';

type Props = {
    children: React.ReactNode,
    style?: object
}

export default function SafeArea({ children, style }: Props) {
    return (
        <View style={[style, styles.container]}>
            <SafeAreaView style={styles.container}>
                {children}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
});