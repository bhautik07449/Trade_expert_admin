import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import serverCall from "../../serverCall";

export const fetchDevelopTopologies = createAsyncThunk(
    "developTopologies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await serverCall.get("/develop-topologies");
            return response?.data?.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Error");
        }
    }
);

const developTopologiesSlice = createSlice({
    name: "developTopologies",
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchDevelopTopologies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDevelopTopologies.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchDevelopTopologies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default developTopologiesSlice.reducer;
