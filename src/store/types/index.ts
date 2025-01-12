// types.ts
export interface InventoryListType {
    category: string;
    name: string;
    price: string;
    quantity: number;
    value: string;
    isEditable?: boolean;
}

export interface InventoryState {
    items: InventoryListType[];
    loading: boolean;
    error: string | null;
}
