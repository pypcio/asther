import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../APIs/apiSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/reduxSlice/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
setupListeners(store.dispatch);
