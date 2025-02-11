import { Colors } from "@/constants/Colors";
import { ThemeContext } from "@/contexts/ThemeContext";
import { useContext } from "react";

export function useThemeColors() {
    const { theme } = useContext(ThemeContext);
    return Colors[theme];
}