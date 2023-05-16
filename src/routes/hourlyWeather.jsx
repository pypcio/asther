import { useLoaderData } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
import { convertWindDegreeToDirection, convertedDate } from "../APIs/functions";

export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  const weather = await getWeather(params.weatherId);
  return weather;
}
export default function HourlyWeather() {
  const { hourly, timezone_offset } = useLoaderData();
  return (
    <>
      {hourly &&
        hourly.map((hour, index) => {
          // console.log("sprawdzam", new Date(hour.dt * 1000));
          return (
            <div key={hour.dt}>
              {hourly[index - 1] !== undefined ? (
                new Date((hour.dt + timezone_offset) * 1000).getUTCHours() ===
                0 ? (
                  <h3>
                    {hour?.dt
                      ? convertedDate(hour.dt + timezone_offset)
                      : convertedDate(null)}
                  </h3>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <div className="w-table hourly">
                <ul>
                  <li>{`${new Date((hour.dt + timezone_offset) * 1000)
                    .getUTCHours()
                    .toString()
                    .padStart(2, "0")}:00`}</li>
                  <li>
                    {" "}
                    <img
                      src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                      alt={`${hour.weather[0].description}`}
                    />
                  </li>
                  <li>{`${hour.temp}°C`}</li>
                </ul>
                <ul>
                  <li>Zachmurzenie</li>
                  <li>Wilgotnosc</li>
                  <li>Deszcz</li>
                </ul>
                <ul>
                  <li>{`${hour.clouds}%`}</li>
                  <li>{`${hour.humidity}%`}</li>
                  <li>{`${Math.round(hour.pop * 100)}%`}</li>
                </ul>
                <ul>
                  <li>Ciśnienie</li>
                  <li>Prędkość wiatru</li>
                  <li>Podmuch wiatru</li>
                </ul>
                <ul>
                  <li>{`${hour.pressure}hPa`}</li>
                  <li>{`${hour.wind_speed}m/s`}</li>
                  <li>{`${hour.wind_gust}m/s`}</li>
                </ul>
                <ul>
                  <li>Kierunek wiatru</li>
                  <li>Indeks UV</li>
                  <li>Widoczność</li>
                </ul>
                <ul>
                  <li>{convertWindDegreeToDirection(hour.wind_deg)}</li>
                  <li>{`${hour.uvi} UVI`}</li>
                  <li>{`${hour.visibility / 1000}km`}</li>
                </ul>
              </div>
            </div>
          );
        })}
    </>
  );
}
