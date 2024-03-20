import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import templateSliceReducer from "./templateSlice";
import keyskillReducer from "./keySkillSlice";
import pdfPreviewReducer from "./pdfPreviewSlice";
import profileReducer from "../store/profileSlice";
import educationReducer from "./educationSlice";
import workReducer from "./workSlice";
import saveReducer from "../store/saveSlice";
export default configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    templateInfo: templateSliceReducer,
    keyskill: keyskillReducer,
    education: educationReducer,
    work: workReducer,
    pdfPreview: pdfPreviewReducer,
    profile: profileReducer,
    save: saveReducer,
  },
});
