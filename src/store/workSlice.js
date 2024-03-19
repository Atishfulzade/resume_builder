import { createSlice } from "@reduxjs/toolkit";

export const workSlice = createSlice({
  name: "work",
  initialState: [],
  reducers: {
    // Define reducers to update state
    updatework: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { updatework } = workSlice.actions;

export const selectwork = (state) => state.work;

export default workSlice.reducer;
