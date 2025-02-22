import { ScrollView, StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { PrivacyPolicy } from '../constants/PrivacyPolicy';
import { useThemeColors } from '../hooks/useThemeColors';
import ThemedText from '../components/ui/ThemedText';

export default function PrivacyPolicyScreen() {
    const { language } = useContext(LanguageContext);
    const colors = useThemeColors();
    const content = PrivacyPolicy[language];

    return (
        <ScrollView
            style={[styles.container, { backgroundColor: colors.coloredBackground }]}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.content}>
                <ThemedText style={styles.title} variant="titleBoldXl">
                    {content.title}
                </ThemedText>
                
                <ThemedText style={styles.lastUpdate} variant="regular" color="accent600">
                    {content.lastUpdate}
                </ThemedText>

                {/* Section 1 */}
                <ThemedText style={styles.sectionTitle} variant="semiboldMd">
                    {content.part1Title}
                </ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">
                    {content.part1Content}
                </ThemedText>

                {/* Section 2 */}
                <ThemedText style={styles.sectionTitle} variant="semiboldMd">
                    {content.part2Title}
                </ThemedText>
                <ThemedText style={styles.subTitle} variant="semibold">
                    {content.part21Subtitle}
                </ThemedText>
                <View style={styles.bulletPoints}>
                    {[content.part211, content.part212, content.part213, content.part214].map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <ThemedText style={styles.bullet}>•</ThemedText>
                            <ThemedText style={styles.bulletText}>{point}</ThemedText>
                        </View>
                    ))}
                </View>
                
                <ThemedText style={styles.subTitle} variant="semibold">
                    {content.part22Subtitle}
                </ThemedText>
                <View style={styles.bulletPoints}>
                    {[content.part221, content.part222, content.part223, content.part224].map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <ThemedText style={styles.bullet}>•</ThemedText>
                            <ThemedText style={styles.bulletText} variant="regular">{point}</ThemedText>
                        </View>
                    ))}
                </View>

                {/* Section 3 */}
                <ThemedText style={styles.sectionTitle} variant="semiboldMd">
                    {content.part3Title}
                </ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">
                    {content.part3Content}
                </ThemedText>
                <View style={styles.bulletPoints}>
                    {[content.part31, content.part32, content.part33, content.part34, content.part35].map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <ThemedText style={styles.bullet}>•</ThemedText>
                            <ThemedText style={styles.bulletText} variant="regular">{point}</ThemedText>
                        </View>
                    ))}
                </View>

                {/* Section 4 */}
                <ThemedText style={styles.sectionTitle} variant="semiboldMd">
                    {content.part4Title}
                </ThemedText>
                <View style={styles.bulletPoints}>
                    {[content.part41, content.part42, content.part43, content.part44].map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <ThemedText style={styles.bullet}>•</ThemedText>
                            <ThemedText style={styles.bulletText} variant="regular">{point}</ThemedText>
                        </View>
                    ))}
                </View>

                {/* Section 5 */}
                <ThemedText style={styles.sectionTitle} variant="semiboldMd">
                    {content.part5}
                </ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">
                    {content.part5Content}
                </ThemedText>
                <View style={styles.bulletPoints}>
                    {[content.part51, content.part52].map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <ThemedText style={styles.bullet}>•</ThemedText>
                            <ThemedText style={styles.bulletText} variant="regular">{point}</ThemedText>
                        </View>
                    ))}
                </View>

                {/* Section 6 */}
                <ThemedText style={styles.sectionTitle} variant="semiboldMd">
                    {content.part6Title}
                </ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">
                    {content.part6Content}
                </ThemedText>
                <View style={styles.bulletPoints}>
                    {[content.part61, content.part62, content.part63].map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <ThemedText style={styles.bullet}>•</ThemedText>
                            <ThemedText style={styles.bulletText} variant="regular">{point}</ThemedText>
                        </View>
                    ))}
                </View>

                {/* Section 7 */}
                <ThemedText style={styles.sectionTitle} variant="semiboldMd">
                    {content.part7Title}
                </ThemedText>
                <ThemedText style={styles.paragraph} variant="regular">
                    {content.part7Content}
                </ThemedText>
                <ThemedText style={styles.email} color="accent500">
                    {content.email}
                </ThemedText>
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
        paddingBottom: 100,
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
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginTop: 10,
        marginBottom: 8,
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