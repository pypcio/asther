import { apiSlice } from "../../APIs/apiSlice";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserData: builder.query({
      query: () =>
        // console.log("ciagne dane"),
        ({
          url: "/api/data",
        }),
      providesTags: (result, error, arg) =>
        result && Array.isArray(result)
          ? [...result.map(({ id }) => ({ type: "Location", id })), "Location"]
          : ["Location"],
    }),
    getUserData: builder.query({
      query: (weatherId) => ({
        url: `/api/data/${weatherId}`,
      }),
      providesTags: ["Location"],
    }),
    createUserData: builder.mutation({
      query: () => ({
        url: `/api/data`,
        method: "POST",
      }),
      invalidatesTags: ["Location"],
    }),
    deleteUserData: builder.mutation({
      query: (weatherId) => ({
        url: `/api/data/${weatherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
    updateUserData: builder.mutation({
      query: ([id, update]) =>
        // console.log("id", id, "updatedForm", update),
        ({
          url: `/api/data/${id}`,
          method: "PUT",
          body: update,
        }),
      invalidatesTags: ["Location"],
    }),
    updateAllUserData: builder.mutation({
      query: (update) => ({
        url: `/api/data`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: ["Location"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `/api/data`,
        method: "DELETE",
      }),
      invalidatesTags: ["Location"],
    }),
    updateUserPassword: builder.mutation({
      query: (update) =>
        // console.log("updatedForm", update),
        ({
          url: `/api/data/password`,
          method: "PATCH",
          body: update,
        }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const {
  useGetAllUserDataQuery,
  useGetUserDataQuery,
  useCreateUserDataMutation,
  useDeleteUserDataMutation,
  useUpdateUserDataMutation,
  useUpdateAllUserDataMutation,
  useDeleteUserMutation,
  useUpdateUserPasswordMutation,
} = userApiSlice;
