import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchClient = createAsyncThunk(
    "client",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/client");
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const clientSlice = createSlice({
    name: "client",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchClient.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default clientSlice.reducer;