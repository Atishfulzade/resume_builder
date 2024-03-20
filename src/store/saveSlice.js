import { createSlice } from "@reduxjs/toolkit";

export const saveSlice = createSlice({
  name: "save",
  initialState: {
    save: "",
  },
  reducers: {
    updateSave: (state, action) => {
      state.save = action.payload;
    },
  },
});

export const { updateSave } = saveSlice.actions;

export default saveSlice.reducer;
