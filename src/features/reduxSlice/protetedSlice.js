import { createSlice } from "@reduxjs/toolkit";

const protectedSlice = createSlice({
  name: "protected",
  initialState: { role: "null" },
  reducers: {
    setRole: (state, action) => {
      const role = action.payload;
      state.role = role;
    },
    eraseRole: (state) => {
      state.role = null;
    },
  },
});

export const { setRole, eraseRole } = protectedSlice.actions;
export default protectedSlice.reducer;
export const selectRole = (state) => state.protected.role;
