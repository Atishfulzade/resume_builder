import { createSlice } from "@reduxjs/toolkit";

export const educationSlice = createSlice({
  name: "education",
  initialState: [],
  reducers: {
    updateEducation: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { updateEducation } = educationSlice.actions;

export const selectEducation = (state) => state.education;

export default educationSlice.reducer;
