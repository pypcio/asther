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
import servises from "../APIs/servises";

export async function loader({ params }) {
  // console.log("wwykonuje loader dla Roota: ");
  // console.log("twoje id: ", params.weatherId);
  const weather = await servises.getOneLocation(params.weatherId);
  return { weather };
}
export default function WeatherRoot() {
  const { weather } = useLoaderData();
  const location = useLocation();
  console.log("location", location.pathname);
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
      <div id="weather">
        <div>
          <Link to={`edit`}>
            <h3>{weather.city || `City`}</h3>
          </Link>
          <h4>{date}</h4>
          <Link to="/">
            <h4>ASTHER</h4>
          </Link>
        </div>
        <div id="linki-pogodowe">
          <p>
            <Link
              className={currentFocus ? "active" : ""}
              to={`/weathers/${weather.id}` || "/"}
            >
              Current
            </Link>
          </p>
          <p>
            <NavLink to={`/weathers/${weather.id}/hourly` || "/"}>
              Hourly
            </NavLink>
          </p>
          <p>
            <NavLink to={`/weathers/${weather.id}/daily` || "/"}>Daily</NavLink>
          </p>
        </div>
      </div>

      <div id="weather-template">
        <Outlet />
      </div>
    </>
  );
}
