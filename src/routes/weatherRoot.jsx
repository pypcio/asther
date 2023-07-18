import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { convertedDate } from "../APIs/functions";
import { useGetUserDataQuery } from "../features/servises/userApiSlice";
import { useEffect, useState } from "react";
export default function WeatherRoot() {
  const { weatherId } = useParams();
  const { data: weather, isLoading } = useGetUserDataQuery(weatherId, {
    skip: !weatherId, // Skip the query if weatherId is not available
    refetchOnMountOrArgChange: true,
  });
  const location = useLocation();
  const [currentFocus, setCurrentFocus] = useState(false);
  console.log("weatherRoot: ", weather);
  useEffect(() => {
    location.pathname === `/user/weathers/${weatherId}`
      ? setCurrentFocus(true)
      : setCurrentFocus(false);
  }, [location.pathname]);
  return (
    <main>
      {!isLoading ? (
        <section>
          <div id="weather">
            <div>
              <Link to={`edit`}>
                <h3>{weather.location.city || `City`}</h3>
              </Link>
              <h4>
                {convertedDate(
                  weather.location.current.dt + weather.location.timezone_offset
                )}
              </h4>
              <Link to="/">
                <h4>ASTHER</h4>
              </Link>
            </div>
            <div id="linki-pogodowe">
              <p>
                <Link
                  className={currentFocus ? "active" : ""}
                  to={`/user/weathers/${weather._id}` || "/"}
                >
                  Current
                </Link>
              </p>
              <p>
                <NavLink to={`/user/weathers/${weather._id}/hourly` || "/"}>
                  Hourly
                </NavLink>
              </p>
              <p>
                <NavLink to={`/user/weathers/${weather._id}/daily` || "/"}>
                  Daily
                </NavLink>
              </p>
            </div>
          </div>
          <div id="weather-template">
            <Outlet />
          </div>
        </section>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
