import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = userSlice.actions;

export default userSlice.reducer;
