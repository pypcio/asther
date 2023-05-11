import { useLoaderData } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";

export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  const weather = await getWeather(params.weatherId);
  const hourly = weather.hourly;
  console.log("pokaz", hourly);
  return { hourly };
}
export default function HourlyWeather() {
  const { hourly } = useLoaderData();
  console.log(hourly);
  function convertWindDegreeToDirection(degree) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degree % 360) / 45) % 8;
    return directions[index];
  }
  return (
    <>
      {hourly &&
        hourly.map((hour) => {
          return (
            <div key={hour.dt} id="hourly" className="w-table">
              <ul>
                <li>{`${new Date(hour.dt * 1000).getHours()}:${new Date(
                  hour.dt * 1000
                )
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`}</li>
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
                <li>{`${hour.pop}%`}</li>
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
          );
        })}
    </>
  );
}
