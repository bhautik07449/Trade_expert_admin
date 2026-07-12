import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchFranchise = createAsyncThunk(
    "franchise",
    async (country, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/franchise", {
                params: country ? { country } : {}
            });
            
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const franchiseSlice = createSlice({
    name: "franchise",
    initialState: {
        type: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFranchise.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFranchise.fulfilled, (state, action) => {
                state.loading = false;
                state.type = action.payload;
            })
            .addCase(fetchFranchise.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default franchiseSlice.reducer;