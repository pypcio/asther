// import axios from "axios";
// const url = "/api/user";
// import { matchSorter } from "match-sorter";
// import sortBy from "sort-by";

// //login
// const logIn = async (user) => {
//   console.log("user: ", user);
//   try {
//     const response = await axios.post(`${url}/login`, JSON.stringify(user), {
//       headers: { "Content-Type": "application/json" },
//       withCredentials: true,
//     });
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// //register
// const register = async (user) => {
//   try {
//     console.log("wchodzi tu?", user);
//     const response = await axios.post(`${url}/register`, user);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// //getUser
// const getUserData = async (id) => {
//   try {
//     console.log("id", id);
//     const response = await axios.get(`${url}/${id}`);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// //refreshToken
// const refreshToken = async () => {
//   try {
//     const response = await axios.get(`${url}/refresh-token`, {
//       withCredentials: true,
//     });
//     response;
//   } catch (error) {
//     console.log(error);
//   }
// };
// export default {
//   logIn,
//   register,
//   getUserData,
//   refreshToken,
// };
