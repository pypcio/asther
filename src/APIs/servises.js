import axios from "axios";
const url = "/api/data";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import * as servises from "./weatherAPI.js";
// import { useWeatherApi } from "./weatherAPI";

const getAllLocation = async (query) => {
  try {
    const response = await axios.get(url);
    const fetchData = response.data.map((weather) =>
      updateLocation(weather.id, {
        city: weather.city,
        lat: weather.lat?.toString(),
        lon: weather.lon?.toString(),
      })
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

const getOneLocation = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    // console.log("getOne: ", response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const createLocation = async () => {
  try {
    const response = await axios.post(url);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateLocation = async (id, updatedLocation) => {
  try {
    const callWeather = await servises.useWeatherApi(updatedLocation);
    const updatedForm = { city: updatedLocation.city, ...callWeather };
    const response = await axios.put(`${url}/${id}`, updatedForm);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const deleteLocation = (id) => {
  return axios.delete(`${url}/${id}`);
};
export default {
  getAllLocation,
  getOneLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
