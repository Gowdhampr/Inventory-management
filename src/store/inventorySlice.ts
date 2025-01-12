import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { InventoryListType, InventoryState } from "./types";

export const fetchInventoryData = createAsyncThunk<InventoryListType[]>(
    "inventory/fetchInventoryData",
    async () => {
        const response = await axios.get(
            "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
        );
        return response.data;
    }
);

const initialState: InventoryState = {
    items: [],
    loading: false,
    error: null,
};

const inventorySlice = createSlice({
    name: "inventory",
    initialState,
    reducers: {
        editInventoryItem: (
            state,
            action: PayloadAction<{
                name: string;
                changes: Partial<InventoryListType>;
            }>
        ) => {
            const { name, changes } = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.name === name
            );
            if (itemIndex >= 0) {
                state.items[itemIndex] = {
                    ...state.items[itemIndex],
                    ...changes,
                };
            }
        },
        enableOrDisableProduct: (
            state,
            action: PayloadAction<{
                name: string;
                changes: Partial<InventoryListType>;
            }>
        ) => {
            const { name } = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.name === name
            );
            if (itemIndex >= 0) {
                state.items[itemIndex] = {
                    ...state.items[itemIndex],
                    isEditable: !state.items[itemIndex].isEditable,
                };
            }
        },
        deleteProduct: (
            state,
            action: PayloadAction<{
                name: string;
                changes: Partial<InventoryListType>;
            }>
        ) => {
            const { name } = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.name === name
            );

            if (itemIndex !== -1) {
                state.items.splice(itemIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventoryData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchInventoryData.fulfilled,
                (state, action: PayloadAction<InventoryListType[]>) => {
                    state.loading = false;
                    state.items = action.payload.map((item) => ({
                        ...item,
                        isEditable: true,
                    }));
                }
            )
            .addCase(fetchInventoryData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Something went wrong";
            });
    },
});

export const { editInventoryItem, enableOrDisableProduct, deleteProduct } =
    inventorySlice.actions;
export default inventorySlice.reducer;
