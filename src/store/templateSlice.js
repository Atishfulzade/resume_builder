import { createSlice } from "@reduxjs/toolkit";

export const templateSlice = createSlice({
  name: "template",
  initialState: {
    selectedTemplate: null,
  },
  reducers: {
    updateSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
  },
});

export const { updateSelectedTemplate } = templateSlice.actions;

export const selectSelectedTemplate = (state) =>
  state.template.selectedTemplate;

export default templateSlice.reducer;
