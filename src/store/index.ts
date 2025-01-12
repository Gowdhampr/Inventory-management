import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "./inventorySlice";
import roleManagementReducer from "./roleManagementSlice";

// Configure the store
const store = configureStore({
    reducer: {
        inventory: inventoryReducer,
        roleManagement: roleManagementReducer,
    },
});

// Export the store and types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
