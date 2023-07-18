import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "locationData",
  initialState: { city: "", lat: null, lon: null },
  reducers: {
    setLocationData: (state, action) => {
      const { city, lat, lon } = action.payload;
      state.data = city;
      state.id = lat;
      state.lon = lon;
    },
  },
});
export const { setLocationData } = userSlice.actions;
export default userSlice.reducer;
export const selectCity = (state) => state.locationData.city;
export const selectLat = (state) => state.locationData.lat;
export const selectCLon = (state) => state.locationData.lon;

// const userSlice = createSlice({
//     name: "userData",
//     initialState: { data: null, id: null },
//     reducers: {
//       setAllData: (state, action) => {
//         const { data, id } = action.payload;
//         state.data = [...data];
//         state.id = id;
//       },
//       setData: (state, action) => {
//         const { update, id } = action.payload;
//         state.data = state.data.map((n) => {
//           if (n._id === id) {
//             n.location = { ...update };
//           }
//           return n;
//         });
//         state.id = id;
//       },
//     },
//   });
