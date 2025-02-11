import AppLogo from "@/components/AppLogo";
import CustomDrawer from "@/components/CustomDrawer";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {

    const [isDrawerVisible, setIsDrawerVisible] = useState(false);

    return (
        <View style={styles.container}>

        <CustomDrawer 
            isVisible={isDrawerVisible} 
            onClose={() => setIsDrawerVisible(false)}
        >
            <SafeAreaView>
                <Text>Contenu du drawer</Text>
            </SafeAreaView>
        </CustomDrawer>

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
    }
});
