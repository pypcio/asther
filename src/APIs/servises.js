import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import * as servises from "./weatherAPI.js";
const url = "/api/data";
// import axios from "./axios.js";
const getAllLocation = async (query, signal, privateAxios) => {
  try {
    console.log(privateAxios.config);
    const response = await privateAxios.get(url, { signal: signal });
    console.log("api response: ", response);
    const fetchData = response.data.map((weather) =>
      updateLocation(
        weather._id.toString(),
        {
          city: weather.location.city,
          lat: weather.location.lat,
          lon: weather.location.lon,
        },
        privateAxios
      )
    );
    let allData = await Promise.all(fetchData);
    console.log("sprawdzam dane", response);
    // let allData = response.data;
    if (query) {
      allData = matchSorter(allData, query, { keys: ["city", "id"] });
    }
    return allData.sort(sortBy("city", "createdAt"));
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getDownloadData = async () => {
  try {
    const response = await axios.get(`${url}/download`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOneLocation = async (id, signal, privateAxios) => {
  try {
    const response = await privateAxios.get(`${url}/${id}`, { signal: signal });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const createLocation = async (privateAxios) => {
  try {
    const response = await privateAxios.post(url);
    console.log("co ty zwracasz");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateLocation = async (id, updatedLocation, privateAxios) => {
  try {
    const callWeather = await servises.useWeatherApi(updatedLocation);
    const updatedForm = {
      location: { city: updatedLocation.city, ...callWeather },
    };
    const response = await privateAxios.put(`${url}/${id}`, updatedForm);
    console.log("update: ", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteLocation = (id, privateAxios) => {
  return privateAxios.delete(`${url}/${id}`);
};
export default {
  getAllLocation,
  getOneLocation,
  createLocation,
  updateLocation,
  deleteLocation,
  getDownloadData,
};
