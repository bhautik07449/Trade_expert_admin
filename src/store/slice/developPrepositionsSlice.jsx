import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchDevelopPrepositions = createAsyncThunk(
    "developPrepositions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/develop-prepositions");
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const developPrepositionsSlice = createSlice({
    name: "developPrepositions",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchDevelopPrepositions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDevelopPrepositions.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchDevelopPrepositions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default developPrepositionsSlice.reducer;
