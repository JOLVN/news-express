import { ScrollView, StyleSheet, View, ViewProps } from "react-native";
import CategoryWrapper from "@/components/ui/CategoryWrapper";
import { useContext, useEffect } from "react";
import { CategoriesContext } from "@/contexts/CategoriesContext";

export default function CategoriesContainer({style}: ViewProps) {

    const { categories, selectCategory, unselectCategory } = useContext(CategoriesContext);

    function handlePress(categoryId: number) {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;
        if (category.selected) {
            unselectCategory(categoryId);
            
        } else {
            selectCategory(categoryId);
        }
    }

    return (
        <View style={[styles.container, style]}>
            {categories.map((category, index) => (
                <CategoryWrapper key={index} category={category} onPress={() => handlePress(category.id)} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    }
});