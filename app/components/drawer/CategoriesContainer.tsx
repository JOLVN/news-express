import { StyleSheet, View, ViewProps } from "react-native";
import CategoryWrapper from "@/components/ui/CategoryWrapper";
import { useContext,  } from "react";
import { CategoriesContext } from "@/contexts/CategoriesContext";

export default function CategoriesContainer({style}: ViewProps) {

    const { categories, userCategories, selectCategory, unselectCategory } = useContext(CategoriesContext);

    function handlePress(categoryId: number) {
        const category = categories.find(c => c.id === categoryId);
        if (!category) return;
        if (userCategories.find(c => c.id === categoryId) && userCategories.length > 1) {
            unselectCategory(categoryId);
        } else {
            selectCategory(categoryId);
        }
    }

    return (
        <View style={[styles.container, style]}>
            {categories.map((category, index) => (
                <CategoryWrapper 
                    key={index} 
                    category={category} 
                    onPress={() => handlePress(category.id)} 
                    isSelected={!!userCategories.find(c => c.id === category.id)}
                />
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