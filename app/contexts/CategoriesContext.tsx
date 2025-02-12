import { UserCategory } from "@/types/categories";
import { createContext, useState } from "react";

interface CategoriesContextProps {
    categories: UserCategory[];
    setCategories: (categories: UserCategory[]) => void;
    selectCategory: (id: number) => void;
    unselectCategory: (id: number) => void;
}

export const CategoriesContext = createContext<CategoriesContextProps>({
    categories: [],
    setCategories: () => {},
    selectCategory: () => {},
    unselectCategory: () => {}
});

export function CategoriesContextProvider({children}: {children: React.ReactNode}) {

    const [categories, setCategories] = useState<UserCategory[]>([]);

    function selectCategory(id: number) {
        setCategories(prevCategories => prevCategories.map(category => {
            if (category.id === id) {
                return {...category, selected: true};
            }
            return category;
        }));
    }    

    function unselectCategory(id: number) {
        setCategories(prevCategories => prevCategories.map(category => {
            if (category.id === id) {
                return {...category, selected: false};
            }
            return category;
        }));
    }

    const values = {
        categories,
        setCategories,
        selectCategory,
        unselectCategory
    }

    return (
        <CategoriesContext.Provider value={values}>
            {children}
        </CategoriesContext.Provider>
    )
}