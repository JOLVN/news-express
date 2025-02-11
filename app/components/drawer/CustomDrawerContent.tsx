import { SafeAreaView, Text } from "react-native";
import ThemeSwitch from "./ThemeSwitch";

export default function CustomDrawerContent() {
    
    return (
        <SafeAreaView>
            <Text>Contenu du drawer</Text>
            <ThemeSwitch />
        </SafeAreaView>
    )
}