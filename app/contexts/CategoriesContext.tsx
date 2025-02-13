import { Category } from "@/types/categories";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

interface CategoriesContextProps {
    categories: Category[];
    setCategories: (categories: Category[]) => void;
    userCategories: Category[];
    setUserCategories: (categories: Category[]) => void;
    selectCategory: (id: number) => void;
    unselectCategory: (id: number) => void;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
    categories: [],
    setCategories: () => {},
    userCategories: [],
    setUserCategories: () => {},
    selectCategory: () => {},
    unselectCategory: () => {}
});

export function CategoriesContextProvider({children}: {children: React.ReactNode}) {

    const [categories, setCategories] = useState<Category[]>([]);
    const [userCategories, setUserCategories] = useState<Category[]>([]);

    const loadSavedCategories = async () => {
        try {
            const savedCategories = await AsyncStorage.getItem('userCategories');
            if (savedCategories) {
                setUserCategories(JSON.parse(savedCategories));
            } else {
                await AsyncStorage.setItem('userCategories', JSON.stringify(categories));
                setUserCategories(categories);
            }
        } catch (error) {
            console.log('Error while loading saved categories:', error);
        }
    };

    const saveCategories = async (categories: Category[]) => {
        try {
            await AsyncStorage.setItem('userCategories', JSON.stringify(categories));
        } catch (error) {
            console.log('Error while saving categories:', error);
        }
    };

    function selectCategory(id: number) {
        const category = categories.find(c => c.id === id);
        if (!category) return;
        const newUserCategories = [...userCategories, category];
        setUserCategories(newUserCategories);
        saveCategories(newUserCategories);
    }    

    function unselectCategory(id: number) {
        const newUserCategories = userCategories.filter(c => c.id !== id);
        setUserCategories(newUserCategories);
        saveCategories(newUserCategories);
    }

    useEffect(() => {
        loadSavedCategories();
    }, [categories]);

    const values = {
        categories,
        setCategories,
        userCategories,
        setUserCategories,
        selectCategory,
        unselectCategory
    }

    return (
        <CategoriesContext.Provider value={values}>
            {children}
        </CategoriesContext.Provider>
    )
}