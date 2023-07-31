import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, refreshToken: null },
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, refreshToken } = action.payload;
      // console.log(
      //   "user: ",
      //   user,
      //   "token: ",
      //   token,
      //   "refreshToken: ",
      //   refreshToken
      // );
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
    },
    logOut: (state, action) => {
      console.log("logOut");
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectRefreshToken = (state) => state.auth.refreshToken;
