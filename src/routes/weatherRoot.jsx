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
export async function loader({ params }) {
  // console.log("wwykonuje loader dla Roota: ");
  // console.log("twoje id: ", params.weatherId);
  const weather = await getWeather(params.weatherId);
  return { weather };
}

export default function WeatherRoot() {
  const { weather } = useLoaderData();
  // console.log("dane dla weather Root: ", weather);
  const formatedDate = convertedDate(weather.current.dt);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     console.log("halo?");
  //     navigate(0);
  //   };
  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);
  return (
    <div>
      <div id="weather">
        <div>
          <h1>{weather.city || `Miasto ${weather.id}`}</h1>
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              action="delete"
              onSubmit={(event) => {
                if (
                  !confirm("Please confirm you want to delete this record.")
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        </div>
        <h3>{formatedDate}</h3>
        <div id="linki-pogodowe">
          {/* <Link to={`/weathers/${weather.id}/current`}>Current</Link>
        <Link to={`/weathers/${weather.id}/hourly`}>Hourly</Link>
        <Link to={`/weathers/${weather.id}/daily`}>Daily</Link> */}
          <p>
            <Link to={`/weathers/${weather.id}/current`}>Current</Link>
          </p>
          <p>
            <Link to={`/weathers/${weather.id}/hourly`}>Hourly</Link>
          </p>
          <p>
            <Link to={`/weathers/${weather.id}/daily`}>Daily</Link>
          </p>
        </div>
      </div>
      <div id="weather-template">
        <Outlet />
      </div>
    </div>
  );
}
