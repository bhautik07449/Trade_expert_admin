import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchProductName = createAsyncThunk(
    "productname",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/countryproductname");

            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const productnameSlice = createSlice({
    name: "productname",
    initialState: {
        type: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchProductName.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductName.fulfilled, (state, action) => {
                state.loading = false;
                state.type = action.payload;
            })
            .addCase(fetchProductName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productnameSlice.reducer;