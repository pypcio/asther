import { useLoaderData } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";

export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  const weather = await getWeather(params.weatherId);
  const daily = weather.daily;
  console.log("pokaz", daily);
  return { daily };
}
export default function DailyWeather() {
  const { daily } = useLoaderData();
  console.log(daily);
  function convertWindDegreeToDirection(degree) {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degree % 360) / 45) % 8;
    return directions[index];
  }
  return (
    <>
      {daily &&
        daily.map((day) => {
          return (
            <div key={day.dt} id="daily" className="w-table">
              <ul>
                <li>{`${new Date(day.dt * 1000).getdays()}:${new Date(
                  day.dt * 1000
                )
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`}</li>
                <li>
                  {" "}
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={`${day.weather[0].description}`}
                  />
                </li>
                <li>{`${day.temp}°C`}</li>
              </ul>
              <ul>
                <li>Zachmurzenie</li>
                <li>Wilgotnosc</li>
                <li>Deszcz</li>
              </ul>
              <ul>
                <li>{`${day.clouds}%`}</li>
                <li>{`${day.humidity}%`}</li>
                <li>{`${day.pop}%`}</li>
              </ul>
              <ul>
                <li>Ciśnienie</li>
                <li>Prędkość wiatru</li>
                <li>Podmuch wiatru</li>
              </ul>
              <ul>
                <li>{`${day.pressure}hPa`}</li>
                <li>{`${day.wind_speed}m/s`}</li>
                <li>{`${day.wind_gust}m/s`}</li>
              </ul>
              <ul>
                <li>Kierunek wiatru</li>
                <li>Indeks UV</li>
                <li>Widoczność</li>
              </ul>
              <ul>
                <li>{convertWindDegreeToDirection(day.wind_deg)}</li>
                <li>{`${day.uvi} UVI`}</li>
                <li>{`${day.visibility / 1000}km`}</li>
              </ul>
            </div>
          );
        })}
    </>
  );
}
