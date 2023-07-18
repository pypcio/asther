import {
  useGetAllUserDataQuery,
  useCreateUserDataMutation,
  useDeleteUserDataMutation,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "../features/servises/userApiSlice";
import * as servises from "../APIs/weatherAPI";
import { useState } from "react";

export default function User() {
  // const queryClient = useQueryClient();
  const { data: user } = useGetAllUserDataQuery();
  // const [deleteUserData] = useDeleteUserDataMutation();
  const [updateUserData] = useUpdateUserDataMutation();
  const [city, setCity] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  console.log("user przed: ", user);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateWeather = await servises.useWeatherApi({ lat, lon });
      const id = user?.[1]._id; // Access the id property from the user object
      const updatedForm = { city, ...updateWeather };
      const response = await updateUserData(id, updatedForm).unwrap();
      setCity("");
      setLat("");
      setLon("");
      // Invalidate the getUserData query to trigger a refetch
      // queryClient.invalidateQueries("getUserData");
      console.log("user po: ", response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="column">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          value={lat}
          placeholder="lat"
          onChange={(e) => setLat(e.target.value)}
        />
        <input
          type="text"
          value={lon}
          placeholder="lon"
          onChange={(e) => setLon(e.target.value)}
        />
        <input
          className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
          type="submit"
          value="submit"
        />
      </form>
    </div>
  );
}
