import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
import { convertWindDegreeToDirection, convertedDate } from "../APIs/functions";
import servises from "../APIs/servises";
export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  const weather = await servises.getOneLocation(params.weatherId);
  // console.log(weather);
  return weather;
}
export default function DailyWeather() {
  const { daily, timezone_offset } = useLoaderData();
  const navigation = useNavigation();
  // console.log(daily);
  // console.log("location: ", navigation.location);
  // console.log("state: ", navigation.state);
  return (
    <>
      {Object.keys(daily).length !== 1 ? (
        daily.map((day) => {
          // console.log("each day: ", day.temp);
          const date = day?.dt
            ? convertedDate(day.dt + timezone_offset)
            : convertedDate(null);
          return (
            <div key={day.dt} className="w-table hourly daily">
              <ul>
                <li>{date}</li>
                <li>
                  {" "}
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                    alt={`${day.weather[0].description}`}
                  />
                </li>
                <li>{`${day.temp.day || "- "}°C`}</li>
              </ul>
              <ul>
                <li>Zachmurzenie</li>
                <li>Wilgotnosc</li>
                <li>Deszcz</li>
              </ul>
              <ul>
                <li>{`${day.clouds || "0 "}%`}</li>
                <li>{`${day.humidity || "0 "}%`}</li>
                <li>{`${Math.round(day.pop * 100) || "0 "}%`}</li>
              </ul>
              <ul>
                <li>Ciśnienie</li>
                <li>Prędkość wiatru</li>
                <li>Podmuch wiatru</li>
              </ul>
              <ul>
                <li>{`${day.pressure || "- "}hPa`}</li>
                <li>{`${day.wind_speed || "0 "}m/s`}</li>
                <li>{`${day.wind_gust || "0 "}m/s`}</li>
              </ul>
              <ul>
                <li>Kierunek wiatru</li>
                <li>Indeks UV</li>
                <li>Opady</li>
              </ul>
              <ul>
                <li>{convertWindDegreeToDirection(day.wind_deg) || "- "}</li>
                <li>{`${day.uvi || "- "}UVI`}</li>
                <li>{`${day.rain || "0 "}mm`}</li>
              </ul>
            </div>
          );
        })
      ) : (
        <div className="options">
          <p>add location first:</p>
          <Link to="edit">
            <button>Edit</button>
          </Link>
        </div>
      )}
    </>
  );
}
