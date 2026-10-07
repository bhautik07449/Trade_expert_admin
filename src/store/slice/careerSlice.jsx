import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchCareer = createAsyncThunk(
    "career",
    async (country, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/career", {
                params: country ? { country } : {}
            });
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const careerSlice = createSlice({
    name: "career",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchCareer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCareer.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCareer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default careerSlice.reducer;
