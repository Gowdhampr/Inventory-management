import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userView: false,
};

// Role Manager slice
const roleManagementSlice = createSlice({
    name: "roleManager",
    initialState,
    reducers: {
        toggleView: (state, action) => {
            state.userView = action.payload;
        },
    },
});

export const { toggleView } = roleManagementSlice.actions;
export default roleManagementSlice.reducer;
