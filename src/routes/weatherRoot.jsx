import {
  Form,
  Link,
  Outlet,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
import { useEffect } from "react";
import { convertedDate } from "../APIs/functions";
import CurrentWeather from "./currentWeather";
export async function loader({ params }) {
  // console.log("wwykonuje loader dla Roota: ");
  // console.log("twoje id: ", params.weatherId);
  const weather = await getWeather(params.weatherId);
  return { weather };
}
export default function WeatherRoot() {
  const { weather } = useLoaderData();
  const date = weather?.current?.dt
    ? convertedDate(weather.current.dt + weather.timezone_offset)
    : convertedDate(null);
  return (
    <>
      {weather ? (
        <div id="weather">
          <div>
            <Link to={`edit`}>
              <h3>{weather.city || `Miasto ${weather.id}`}</h3>
            </Link>
            <h4>{date}</h4>
          </div>
          <div id="linki-pogodowe">
            <p>
              <Link to={`/weathers/${weather.id}` || "/"}>Current</Link>
            </p>
            <p>
              <Link to={`/weathers/${weather.id}/hourly` || "/"}>Hourly</Link>
            </p>
            <p>
              <Link to={`/weathers/${weather.id}/daily` || "/"}>Daily</Link>
            </p>
          </div>
        </div>
      ) : (
        <div className="edit-option">
          <Form action="edit">
            <p>add location first:</p>
            <button type="submit">Edit</button>
          </Form>
        </div>
      )}
      <nav id="weather-template">
        <Outlet />
      </nav>
    </>
  );
}
