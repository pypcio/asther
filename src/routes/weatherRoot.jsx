import {
  Form,
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
import { useEffect, useRef, useState } from "react";
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
  const location = useLocation();
  // console.log("location", location.pathname);
  const [currentFocus, setCurrentFocus] = useState(false);
  const date = weather?.current?.dt
    ? convertedDate(weather.current.dt + weather.timezone_offset)
    : convertedDate(null);
  useEffect(() => {
    location.pathname === `/weathers/${weather.id}`
      ? setCurrentFocus(true)
      : setCurrentFocus(false);
  }, [location.pathname]);
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
              <Link
                className={currentFocus ? "active" : ""}
                to={`/weathers/${weather.id}` || "/"}
              >
                Obecnie
              </Link>
            </p>
            <p>
              <NavLink to={`/weathers/${weather.id}/hourly` || "/"}>
                Godzinowa
              </NavLink>
            </p>
            <p>
              <NavLink to={`/weathers/${weather.id}/daily` || "/"}>
                Dzienna
              </NavLink>
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
