import { createSlice } from "@reduxjs/toolkit";

// Slice for managing personal information
export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState: {
    firstname: "",
    lastname: "",
    email: "",
    contactnumber: "",
    address: "",
    city: "",
    state: "",
    postalcode: "",
    objective: "",
  },
  reducers: {
    // Action to update personal information
    updatePersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Export actions for use in components
export const { updatePersonalInfo } = personalInfoSlice.actions;

// Selector to get personal information state from the store
export const selectPersonalInfo = (state) => state.personalInfo;

// Export the reducer to be used in the store
export default personalInfoSlice.reducer;
