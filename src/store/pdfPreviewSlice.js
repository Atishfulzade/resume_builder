// pdfPreviewSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pdfData: null,
};

const pdfPreviewSlice = createSlice({
  name: "pdfPreview",
  initialState,
  reducers: {
    setPdfData: (state, action) => {
      state.pdfData = action.payload;
    },
  },
});

export const { setPdfData } = pdfPreviewSlice.actions;

export default pdfPreviewSlice.reducer;
