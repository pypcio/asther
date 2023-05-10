export async function useWeatherApi({ lat, lng }) {
  console.log("dlugosc,szerokosc: ", lat, lng);
  const units = "metric";
  const lang = "pl";
  //   const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

  const res = await fetch(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&lang=${lang}&units=${units}&appid=${
      import.meta.env.VITE_REACT_APP_API_KEY
    }`
  );
  if (!res.ok) {
    throw new Error("could not find that location");
  }
  const result = await res.json();
  console.log("api data: ");
  return result;
}
