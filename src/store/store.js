import { configureStore } from "@reduxjs/toolkit";
import personalInfoReducer from "./personalInfoSlice";
import templateSliceReducer from "./templateSlice";
import keyskillReducer from "./keySkillSlice";
import educationReducer from "./educationSlice";
import workReducer from "./workSlice";
export default configureStore({
  reducer: {
    personalInfo: personalInfoReducer,
    templateInfo: templateSliceReducer,
    keyskill: keyskillReducer,
    education: educationReducer,
    work: workReducer,
  },
});
