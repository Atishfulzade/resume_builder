import { createSlice } from "@reduxjs/toolkit";

// Slice for managing save state
export const saveSlice = createSlice({
  name: "save",
  initialState: {
    save: "",
  },
  reducers: {
    // Action to update the save state
    updateSave: (state, action) => {
      state.save = action.payload;
    },
  },
});

// Export actions for use in components
export const { updateSave } = saveSlice.actions;

// Export the reducer to be used in the store
export default saveSlice.reducer;
