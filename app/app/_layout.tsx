import { ThemeContext, ThemeContextProvider } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";

function Root() {

    const { theme } = useContext(ThemeContext);

    return (
        <>
            <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            <Stack>
                <Stack.Screen name="index" options={{ 
                headerShown: false,
                title: "Home",
                }} />
                <Stack.Screen name="article/[id]" />
            </Stack>
        </>
    )
}

export default function RootLayout() {
    return (
        <ThemeContextProvider>
            <Root />
        </ThemeContextProvider>
    );
}
