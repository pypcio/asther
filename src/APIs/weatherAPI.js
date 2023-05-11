export async function useWeatherApi(updates) {
  const { city, lat, lng } = updates;
  console.log("miasto, dlugosc,szerokosc", city, lat, lng);
  //   console.log("dlugosc,szerokosc: ", lat, lng);
  const units = "metric";
  const lang = "pl";
  //   const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;
  //   console.log((lat && lng) !== "");
  if ((lat && lng) !== "") {
    const res = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&lang=${lang}&units=${units}&appid=${
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
    console.log("podaj lat i lng");
    return updates;
  }
}
