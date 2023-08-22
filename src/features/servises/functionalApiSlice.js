import { apiSlice } from "../../APIs/apiSlice";
export const weatherApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWeather: builder.mutation({
      query: (data) => ({
        url: `/api/data/weather`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Location"],
    }),
    geocodingGoogleApi: builder.mutation({
      query: (data) => ({
        url: `/api/data/geolocation`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Location"],
    }),
  }),
});

export const { useGetWeatherMutation, useGeocodingGoogleApiMutation } =
  weatherApiSlice;
