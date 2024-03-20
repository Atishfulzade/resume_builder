// profileSlice.js

import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profilePic: null, // Initial state for profile picture
  },
  reducers: {
    setProfilePic: (state, action) => {
      state.profilePic = action.payload; // Update profile picture in the state
    },
  },
});

export const { setProfilePic } = profileSlice.actions;

export const selectProfilePic = (state) => state.profile.profilePic;

export default profileSlice.reducer;
