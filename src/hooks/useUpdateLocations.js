import {
  useGetAllUserDataQuery,
  useUpdateAllUserDataMutation,
} from "../features/servises/userApiSlice";
import * as servises from "../APIs/weatherAPI";

const useUpdateLocationsData = () => {
  const { data: weathers, isLoading, error } = useGetAllUserDataQuery();
  const [updateAllUserData] = useUpdateAllUserDataMutation();
  if (isLoading) {
    return { loading: true, error: null, results: null };
  }
  // Error state if there is an error fetching data
  if (error) {
    return {
      loading: false,
      error: "Error fetching data",
      results: null,
      data: null,
    };
  }
  const updateWeatherData = async () => {
    console.log("weathers: ", weathers);
    if (!isLoading) {
      try {
        const fetchData = weathers.map(async (weather) => {
          const updateWeather = await servises.useWeatherApi({
            lat: weather.location.lat,
            lon: weather.location.lon,
          });
          console.log("update weather", updateWeather);
          return updateWeather;
        });
        // Wait for all API calls to finish and return the results
        const results = await Promise.all(fetchData);
        console.log("results", results);
        // Update the data on the server
        const updateAllData = await updateAllUserData(results);
        return { loading: false, error: null, updateAllData };
      } catch (error) {
        return { loading: false, error: "Error updating data", results: null };
      }
    }
    return { loading: false, error: "Error fetching data", results: null };
  };

  return {
    loading: false,
    error: null,
    results: null,
    updateWeatherData,
  };
};

export default useUpdateLocationsData;
