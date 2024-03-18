import { createSlice } from "@reduxjs/toolkit";

export const personalInfoSlice = createSlice({
  name: "personalInfo",
  initialState: {
    profilepic: "",
    firstname: "",
    lastname: "",
    email: "",
    contactnumber: "",
    address: "",
    city: "",
    state: "",
    postalcode: "",
    objective: "",
    // Add other fields as needed
  },
  reducers: {
    // Define reducers to update state
    updatePersonalInfo: (state, action) => {
      // Update state with payload data
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePersonalInfo } = personalInfoSlice.actions;

export const selectPersonalInfo = (state) => state.personalInfo;

export default personalInfoSlice.reducer;
