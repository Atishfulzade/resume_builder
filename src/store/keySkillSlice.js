import { createSlice } from "@reduxjs/toolkit";

export const keySkillSlice = createSlice({
  name: "keyskill",
  initialState: [],
  reducers: {
    updateSkill: (state, action) => {
      state.push(action.payload);
    },
  },
});
export const { updateSkill } = keySkillSlice.actions;

export const selectKeySkill = (state) => state.keyskill;

export default keySkillSlice.reducer;
