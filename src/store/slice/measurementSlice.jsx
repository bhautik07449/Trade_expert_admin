import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchFlatMeasurement = createAsyncThunk(
    "measurements",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/measurements");
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const measurementSlice = createSlice({
    name: "measurements",
    initialState: {
        flatList: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchFlatMeasurement.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFlatMeasurement.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchFlatMeasurement.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default measurementSlice.reducer;