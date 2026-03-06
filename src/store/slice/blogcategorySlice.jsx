import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchFlatBlogCategories = createAsyncThunk(
    "blogcategory",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/blogcategory");
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const blogcategoriesSlice = createSlice({
    name: "blogcategories",
    initialState: {
        flatList: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFlatBlogCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlatBlogCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchFlatBlogCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default blogcategoriesSlice.reducer;