import { Form, Link, Outlet, useLoaderData } from "react-router-dom";
import { getWeather } from "../APIs/dataAPI";
export async function loader({ params }) {
  // console.log("twoje id: ", params.weatherId);
  const weather = await getWeather(params.weatherId);
  return { weather };
}

export default function WeatherRoot() {
  const { weather } = useLoaderData();
  // console.log(weather);

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
        <div>
          {/* <Link to={`/weathers/${weather.id}/current`}>Current</Link>
        <Link to={`/weathers/${weather.id}/hourly`}>Hourly</Link>
        <Link to={`/weathers/${weather.id}/daily`}>Daily</Link> */}
          <Link to={`/weathers/${weather.id}/current`}>Current</Link>
          <Link to={`/weathers/${weather.id}/hourly`}>Hourly</Link>
          <Link to={`/weathers/${weather.id}/daily`}>Daily</Link>
        </div>
      </div>
      <div id="weather-template">
        <Outlet />
      </div>
    </div>
  );
}
