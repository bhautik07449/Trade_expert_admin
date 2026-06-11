import { createSlice } from "@reduxjs/toolkit";

const countryFilterSlice = createSlice({
    name: "countryFilter",
    initialState: {
        selectedCountry: "",
    },
    reducers: {
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
        },
        clearCountryFilter: (state) => {
            state.selectedCountry = "";
        },
    },
});

export const { setSelectedCountry, clearCountryFilter } = countryFilterSlice.actions;

export default countryFilterSlice.reducer;
