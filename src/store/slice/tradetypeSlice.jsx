import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchTradeType = createAsyncThunk(
    "tradetype",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/tradetype");
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const tradeTypeSlice = createSlice({
    name: "tradeType",
    initialState: {
        flatList: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchTradeType.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTradeType.fulfilled, (state, action) => {
                state.loading = false;
                state.flatList = action.payload;
            })
            .addCase(fetchTradeType.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default tradeTypeSlice.reducer;