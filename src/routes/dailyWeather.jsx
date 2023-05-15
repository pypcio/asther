import { useLoaderData } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
import { convertWindDegreeToDirection, convertedDate } from "../APIs/functions";

export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  const weather = await getWeather(params.weatherId);
  console.log(weather);
  return weather;
}
export default function DailyWeather() {
  const { daily, timezone_offset } = useLoaderData();

  return (
    <>
      {daily &&
        daily.map((day) => {
          const date = day?.dt
            ? convertedDate(day.dt + timezone_offset)
            : convertedDate(null);
          return (
            <div key={day.dt} id="daily" className="w-table">
              <ul>
                <li>{date}</li>
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
