import AppLogo from "@/components/AppLogo";
import CustomDrawer from "@/components/drawer/CustomDrawer";
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import { fetchArticles } from "@/functions/API";
import { useThemeColors } from "@/hooks/useThemeColors";
import { ArticleResponse } from "@/types/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);
    const [articles, setArticles] = useState<ArticleResponse | undefined>(undefined);
    const colors = useThemeColors();
    const today = '2025-02-08';

    async function getArticles() {
        try {
            console.log('fetching articles...');
            
            const data = await fetchArticles(today);
            setArticles(data);
            console.log(data);
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getArticles();
    }, []);

    return (
        <View style={[styles.container, {backgroundColor: colors.coloredBackground}]}>

            <CustomDrawer 
                isVisible={isDrawerVisible} 
                onClose={() => setIsDrawerVisible(false)}
            >
                <CustomDrawerContent />
            </CustomDrawer>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: articles?.articles[0].image }}
                    style={{ width: '100%', height: '100%' }}
                />
            </View>

            <SafeAreaView style={styles.contentContainer}>
                <AppLogo onPress={() => setIsDrawerVisible(true)} />
            </SafeAreaView>

            {/* <Link href={{ pathname: '/article/[id]', params: {id: 1} }} asChild>
                <Pressable>
                <Text>Go to article 1</Text>
                </Pressable>
            </Link> */}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    imageContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '60%',
    },
});
