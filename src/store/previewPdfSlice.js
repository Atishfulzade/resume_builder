import { createSlice } from "@reduxjs/toolkit";

const pdfPreviewSlice = createSlice({
  name: "pdfPreview",
  initialState: { pdfData: null },
  reducers: {
    setPdfData: (state, action) => {
      state.pdfData = action.payload;
    },
  },
});

export const { setPdfData } = pdfPreviewSlice.actions;

export default pdfPreviewSlice.reducer;
