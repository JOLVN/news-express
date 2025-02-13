import { Category } from "@/types/categories";
import { createContext, useState } from "react";

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

    function selectCategory(id: number) {
        const category = categories.find(c => c.id === id);
        if (!category) return;
        setUserCategories([...userCategories, category]);
    }    

    function unselectCategory(id: number) {
        setUserCategories(userCategories.filter(c => c.id !== id));
    }

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