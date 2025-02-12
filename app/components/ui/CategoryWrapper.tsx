import { UserCategory } from "@/types/categories";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemedText from "@/components/ui/ThemedText";

type Props = {
    category: UserCategory;
    onPress: () => void;
}

export default function CategoryWrapper({category, onPress}: Props) {

    const colors = useThemeColors();

    return (
        <View style={[styles.container, {backgroundColor: colors.gray800}]}>
            <Text>{category.emoji}</Text>
            <ThemedText variant="category" color={category.selected ? 'text' : 'gray500'}>{category.name}</ThemedText>
            <Pressable style={[styles.button, {borderColor: colors.accent500}]} onPress={onPress}>
                <AntDesign name={category.selected ? 'check' : 'plus'} size={16} color={colors.accent500} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 10,
        borderRadius: 50,
        gap: 10
    },
    button: {
        height: 25,
        width: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        borderWidth: 1,
    }
});