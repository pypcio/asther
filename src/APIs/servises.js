import axios from "axios";
const url = "/api/data";

const getAllLocation = async () => {
  try {
    const response = await axios.get(url);
    console.log("sprawdzam dane", response);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getOneLocation = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);
    console.log("getOne: ", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const createLocation = async (newLocation) => {
  try {
    const response = await axios.post(url, newLocation);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateLocation = async (id, updatedLocation) => {
  try {
    const response = await axios.put(`${url}/${id}`, updatedLocation);
    return response;
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
