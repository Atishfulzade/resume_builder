import { createSlice } from "@reduxjs/toolkit";

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
    updatePersonalInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updatePersonalInfo } = personalInfoSlice.actions;

export const selectPersonalInfo = (state) => state.personalInfo;

export default personalInfoSlice.reducer;
