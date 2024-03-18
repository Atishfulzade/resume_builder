import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import templateSliceReducer from "./templateSlice";
export default configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    templateInfo: templateSliceReducer,
  },
});
