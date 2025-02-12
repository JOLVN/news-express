export interface Category {
    id: number;
    name: string;
    emoji: string;
}

export type UserCategory = Category & {selected: boolean};