import { Form, useLoaderData, useNavigation } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
import { convertWindDegreeToDirection } from "../APIs/functions";

export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  // console.log("wywołuje loader dla current:");
  const weather = await getWeather(params.weatherId);
  // console.log(weather);

  return weather;
}
export default function CurrentWeather() {
  const { current, timezone_offset } = useLoaderData();
  // console.log("pokaz status strony", navigation.state);
  return (
    <div>
      {current ? (
        <div className="w-table">
          <ul>
            <li>{`${new Date(
              (current.dt + timezone_offset) * 1000
            ).getUTCHours()}:${new Date((current.dt + timezone_offset) * 1000)
              .getUTCMinutes()
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
            <li>{`${current.temp || "0"}°C`}</li>
          </ul>
          <ul>
            <li>Zachmurzenie</li>
            <li>Wilgotnosc</li>
            <li>Odczuwalna</li>
          </ul>
          <ul>
            <li>{`${current.clouds || "0"}%`}</li>
            <li>{`${current.humidity || "0"}%`}</li>
            <li>{`${current.feels_like || "0"}°C`}</li>
          </ul>
          <ul>
            <li>Ciśnienie</li>
            <li>Prędkość wiatru</li>
            <li>Podmuch wiatru</li>
          </ul>
          <ul>
            <li>{`${current.pressure || "- "}hPa`}</li>
            <li>{`${current.wind_speed || "0"}m/s`}</li>
            <li>{`${current.wind_gust || "0"}m/s`}</li>
          </ul>
          <ul>
            <li>Kierunek wiatru</li>
            <li>Indeks UV</li>
            <li>Widoczność</li>
          </ul>
          <ul>
            <li>{convertWindDegreeToDirection(current.wind_deg)}</li>
            <li>{`${current.uvi || "0"} UVI`}</li>
            <li>{`${current.visibility / 1000 || "- "}km`}</li>
          </ul>
        </div>
      ) : (
        <div className="edit-option">
          <Form action="edit">
            <p>add location first:</p>
            <button type="submit">Edit</button>
          </Form>
        </div>
      )}
    </div>
  );
}
