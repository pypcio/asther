import { useLoaderData, useNavigation } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
import DownloadButton from "./DownloadButton";
import { useEffect } from "react";

export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  // console.log("wywołuje loader dla current:");
  const weather = await getWeather(params.weatherId);
  // console.log(weather);
  const current = await weather.current;
  return { current };
}
export default function CurrentWeather() {
  const { current } = useLoaderData();
  const navigation = useNavigation();
  // console.log("dane dla current: ", current);
  // console.log("pokaz status strony", navigation.state);
  function convertWindDegreeToDirection(degree) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = degree ? Math.round((degree % 360) / 45) % 8 : null;
    return directions[index];
  }
  // useEffect(() => {
  //   const isChanged = async (id) => {
  //     const fresh = await getWeather(id);
  //     const current = fresh.current;
  //     return current;
  //   };
  //   isChanged(current.id);
  // }, []);
  return (
    <>
      <DownloadButton data={[current]} />
      {current && (
        <div className="w-table">
          <ul>
            <li>{`${new Date(current.dt * 1000).getHours()}:${new Date(
              current.dt * 1000
            )
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}</li>
            <li>
              {" "}
              {current.weather && (
                <img
                  src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                  alt={`${current.weather[0].description || "-"}`}
                />
              )}
            </li>
            <li>{`${current.temp || "-"}°C`}</li>
          </ul>
          <ul>
            <li>Zachmurzenie</li>
            <li>Wilgotnosc</li>
            <li>Odczuwalna</li>
          </ul>
          <ul>
            <li>{`${current.clouds || "-"}%`}</li>
            <li>{`${current.humidity || "-"}%`}</li>
            <li>{`${current.feels_like || "-"}°C`}</li>
          </ul>
          <ul>
            <li>Ciśnienie</li>
            <li>Prędkość wiatru</li>
            <li>Podmuch wiatru</li>
          </ul>
          <ul>
            <li>{`${current.pressure || "-"}hPa`}</li>
            <li>{`${current.wind_speed || "-"}m/s`}</li>
            <li>{`${current.wind_gust || "-"}m/s`}</li>
          </ul>
          <ul>
            <li>Kierunek wiatru</li>
            <li>Indeks UV</li>
            <li>Widoczność</li>
          </ul>
          <ul>
            <li>{convertWindDegreeToDirection(current.wind_deg)}</li>
            <li>{`${current.uvi || "-"} UVI`}</li>
            <li>{`${current.visibility / 1000 || "-"}km`}</li>
          </ul>
        </div>
      )}
    </>
  );
}
