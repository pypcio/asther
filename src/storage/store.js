import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../APIs/apiSlice";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    userData: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
