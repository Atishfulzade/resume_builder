import { createSlice } from "@reduxjs/toolkit";

// Slice for managing PDF preview data
const pdfPreviewSlice = createSlice({
  name: "pdfPreview",
  initialState: { pdfData: null },
  reducers: {
    // Action to set PDF data
    setPdfData: (state, action) => {
      state.pdfData = action.payload;
    },
  },
});

// Export actions for use in components
export const { setPdfData } = pdfPreviewSlice.actions;

// Export the reducer to be used in the store
export default pdfPreviewSlice.reducer;
