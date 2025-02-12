import { SafeAreaView, Text } from "react-native";
import ThemeSwitch from "./ThemeSwitch";
import SafeArea from "../SafeArea";

export default function CustomDrawerContent() {
    
    return (
        <SafeArea>
            <Text>Contenu du drawer</Text>
            <ThemeSwitch />
        </SafeArea>
    )
}