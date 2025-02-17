import { Category } from "@/types/categories";
import { createContext, useEffect, useState } from "react";
import { UserCategoriesService } from '@/services/UserCategories';

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
            const savedCategories = await UserCategoriesService.getUserCategories();
            if (savedCategories) {
                setUserCategories(savedCategories);
            } else {
                await UserCategoriesService.setUserCategories(categories);
                setUserCategories(categories);
            }
        } catch (error) {
            console.log('Error while loading saved categories:', error);
        }
    };

    const saveCategories = async (categories: Category[]) => {
        try {
            await UserCategoriesService.setUserCategories(categories);
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