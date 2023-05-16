export async function useWeatherApi(updates) {
  const { city, lat, lon } = updates;
  // console.log("miasto, dlugosc,szerokosc", typeof city, typeof lat, lon);
  //   console.log("dlugosc,szerokosc: ", lat, lon);
  const units = "metric";
  const lang = "pl";
  //   const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  //   console.log((lat && lon) !== "");
  if (
    typeof lat === "string" &&
    typeof lon === "string" &&
    lat.length > 0 &&
    lon.length > 0
  ) {
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&lang=${lang}&units=${units}&appid=${
        import.meta.env.VITE_REACT_APP_API_KEY
      }`
    );
    if (!res.ok) {
      throw new Error("could not find that location");
    }
    console.log("dzwonie po api");
    const result = await res.json();
    return result;
  } else {
    // console.log("podaj lat i lon");
    return updates;
  }
}
