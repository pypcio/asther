import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/reduxSlice/authSlice";
const baseQuery = fetchBaseQuery({
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    // console.log(token);
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryRefresh = fetchBaseQuery({
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const refreshToken = getState().auth.refreshToken;
    if (refreshToken) {
      headers.set("authorization", `Bearer ${refreshToken}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // console.log("result: ", result);
  if ([403, 401].includes(result?.meta?.response?.status)) {
    // console.log("sending refreshToken");
    const refreshResult = await baseQueryRefresh(
      {
        url: "/api/user/refresh-token",
        method: "GET",
      },
      api,
      extraOptions
    );
    // console.log("co tu jest", refreshResult);
    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      // console.log("sprawdzam:", refreshResult);
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ["Location"],
  endpoints: (builder) => ({}),
});
