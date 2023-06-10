import axios from "axios";

export const useWeatherApi = async (updates) => {
  const { city, lat, lon } = updates;
  // console.log("miasto, dlugosc,szerokosc", typeof city, typeof lat, lon);
  //   console.log("dlugosc,szerokosc: ", lat, lon);
  const units = "metric";
  const lang = "pl";
  const apiKey = import.meta.env.VITE_REACT_APP_OPEN_WEATHER_API_KEY;
  //   const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  //   console.log((lat && lon) !== "");
  if (
    typeof lat === "string" &&
    typeof lon === "string" &&
    lat.length > 0 &&
    lon.length > 0
  ) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${apiKey}`
    );
    if (!res.ok) {
      throw new Error("could not find that location");
    }
    console.log("dzwonie po api");
    const result = await res.json();
    return result;
  } else {
    return updates;
  }
};
export const geocodingGoogleApi = async (location) => {
  if (location) {
    const temp = location.replace(/[,\s]+/g, "+");
    const params = {
      address: temp,
      key: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    };
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/geocode/json",
        { params }
      );
      const data = response.data;
      const location = data.results[0].geometry.location;
      return location;
    } catch (error) {
      console.log(error);
    }
  }
};
// export default { useWeatherApi, geocodingGoogleApi };
