import { createSlice } from "@reduxjs/toolkit";

// Slice for managing education information
export const educationSlice = createSlice({
  name: "education",
  initialState: [],
  reducers: {
    // Action to update education by adding a new entry
    updateEducation: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Export actions for use in components
export const { updateEducation } = educationSlice.actions;

// Selector to get education state from the store
export const selectEducation = (state) => state.education;

// Export the reducer to be used in the store
export default educationSlice.reducer;
