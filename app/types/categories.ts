interface CategoryName {
    fr: string;
    en: string;
}

export interface Category {
    id: number;
    label: string;
    name: CategoryName;
    emoji: string;
}