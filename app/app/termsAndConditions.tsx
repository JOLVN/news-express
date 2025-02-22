import { ScrollView, StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { TermsAndConditions } from '../constants/TermsAndConditions';
import { useThemeColors } from '../hooks/useThemeColors';
import ThemedText from '../components/ui/ThemedText';

export default function TermsAndConditionsScreen() {
    const { language } = useContext(LanguageContext);
    const colors = useThemeColors();
    const content = TermsAndConditions[language];

    const renderBulletPoints = (points: string[]) => (
        <View style={styles.bulletPoints}>
            {points.map((point, index) => (
                <View key={index} style={styles.bulletPoint}>
                    <ThemedText style={styles.bullet}>•</ThemedText>
                    <ThemedText style={styles.bulletText} variant="regular">{point}</ThemedText>
                </View>
            ))}
        </View>
    );

    return (
        <ScrollView 
            style={[styles.container, { backgroundColor: colors.background }]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                <ThemedText style={styles.title} variant="titleBoldXl">{content.title}</ThemedText>
                <ThemedText style={styles.lastUpdate} variant="regular" color="accent600">{content.lastUpdate}</ThemedText>

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part1Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part1Content}</ThemedText>

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part2Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part2Content}</ThemedText>
                {renderBulletPoints([content.part21, content.part22, content.part23, content.part24])}

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part3Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part3Content}</ThemedText>
                {renderBulletPoints([content.part31, content.part32, content.part33, content.part34, content.part35])}

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part4Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part4Content}</ThemedText>
                {renderBulletPoints([content.part41, content.part42, content.part43, content.part44])}

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part5Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part5Content}</ThemedText>
                {renderBulletPoints([content.part51, content.part52, content.part53, content.part54])}

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part6Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part6Content}</ThemedText>
                {renderBulletPoints([content.part61, content.part62, content.part63, content.part64])}

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part7Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part7Content}</ThemedText>

                <ThemedText style={styles.sectionTitle} variant="semiboldMd">{content.part8Title}</ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">{content.part8Content}</ThemedText>
                <ThemedText style={styles.email} variant="regular" color="accent500">{content.email}</ThemedText>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    lastUpdate: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 15,
        marginBottom: 10,
        lineHeight: 22,
    },
    bulletPoints: {
        marginLeft: 10,
        marginBottom: 15,
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 5,
        alignItems: 'flex-start',
    },
    bullet: {
        marginRight: 8,
        fontSize: 15,
    },
    bulletText: {
        flex: 1,
        fontSize: 15,
        lineHeight: 22,
    },
    email: {
        fontSize: 15,
        marginTop: 8,
        fontWeight: '500',
    },
});