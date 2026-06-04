import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchFlatCategories = createAsyncThunk(
    "categories/fetchFlat",
    async (country, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/categories/parents", {
                params: country ? { country } : {}
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (country, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/categories", {
                params: country ? { country } : {}
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        flatList: [],
        categories: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFlatCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlatCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchFlatCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default categoriesSlice.reducer;