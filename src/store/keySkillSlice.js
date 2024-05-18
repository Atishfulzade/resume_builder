import { createSlice } from "@reduxjs/toolkit";

// Slice for managing key skills
export const keySkillSlice = createSlice({
  name: "keyskill",
  initialState: [],
  reducers: {
    // Action to update key skills by adding a new skill
    updateSkill: (state, action) => {
      state.push(action.payload);
    },
  },
});

// Export actions for use in components
export const { updateSkill } = keySkillSlice.actions;

// Selector to get key skills state from the store
export const selectKeySkill = (state) => state.keyskill;

// Export the reducer to be used in the store
export default keySkillSlice.reducer;
