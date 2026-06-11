import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchTradeoffer = createAsyncThunk(
    "tradeoffer",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/tradeoffer");
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const tradeOfferSlice = createSlice({
    name: "tradeOffer",
    initialState: {
        flatList: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchTradeoffer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTradeoffer.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchTradeoffer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default tradeOfferSlice.reducer;