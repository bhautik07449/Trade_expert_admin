import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchAbcType = createAsyncThunk(
    "abctype",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/abctype");

            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const abctypeSlice = createSlice({
    name: "abctype",
    initialState: {
        type: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchAbcType.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAbcType.fulfilled, (state, action) => {
                state.loading = false;
                state.type = action.payload;
            })
            .addCase(fetchAbcType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default abctypeSlice.reducer;