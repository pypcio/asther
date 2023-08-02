import { Link, useParams } from "react-router-dom";
// import { getWeather } from "../APIs/dataAPI";
import {
  convertWindDegreeToDirection,
  convertedDate,
} from "../../../features/others/functions";
import { useGetUserDataQuery } from "../../../features/servises/userApiSlice";
import { Skeleton, Stack } from "@mui/material";
// import servises from "../APIs/servises";
// export async function loader({ params }) {
//   // console.log("twoje id: ", params.weatherId);
//   const weather = await servises.getOneLocation(params.weatherId);
//   return weather;
// }
export default function HourlyWeather() {
  // const { hourly, timezone_offset } = useLoaderData();
  // console.log("godzinowa: ", hourly.length);
  const { weatherId } = useParams();
  const { data: oneLocation, isLoading } = useGetUserDataQuery(weatherId, {
    skip: !weatherId, // Skip the query if weatherId is not available
    refetchOnMountOrArgChange: true,
  });
  const { hourly, timezone_offset } = oneLocation?.location ?? [];
  // console.log("hourly", hourly[0]);
  return (
    <div className="data-parent">
      {!isLoading && hourly[0] ? (
        hourly.map((hour, index) => {
          // console.log("sprawdzam", new Date(hour.dt * 1000));
          return (
            <div key={hour.dt}>
              {hourly[index - 1] !== undefined ? (
                new Date((hour.dt + timezone_offset) * 1000).getUTCHours() ===
                0 ? (
                  <h3>
                    {hour?.dt
                      ? convertedDate(hour.dt + timezone_offset)
                      : convertedDate(null)}
                  </h3>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
              <div className="data-display">
                <div>
                  <p>{`${new Date(
                    (hour.dt + timezone_offset) * 1000
                  ).getUTCHours()}:${new Date(
                    (hour.dt + timezone_offset) * 1000
                  )
                    .getUTCMinutes()
                    .toString()
                    .padStart(2, "0")}`}</p>
                </div>
                <div>
                  <p>
                    {hour.weather && (
                      <img
                        src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                        alt={`${hour.weather[0].description || "-"}`}
                      />
                    )}
                  </p>
                </div>
                <div>
                  <p>{`${hour.temp || "0"} °C`}</p>
                </div>
                <div>
                  <p>Zachmurzenie</p>
                  <p>Wilgotnosc</p>
                  <p>Odczuwalna</p>
                </div>
                <div>
                  <p>{`${hour.clouds || "0"} %`}</p>
                  <p>{`${hour.humidity || "0"} %`}</p>
                  <p>{`${hour.feels_like || "0"} °C`}</p>
                </div>
                <div>
                  <p>Kierunek wiatru</p>
                  <p>Prędkość wiatru</p>
                  <p>Podmuch wiatru</p>
                </div>
                <div>
                  <p>{convertWindDegreeToDirection(hour.wind_deg) || "- "}</p>
                  <p>{`${hour.wind_speed || "0"} m/s`}</p>
                  <p>{`${hour.wind_gust || "0"} m/s`}</p>
                </div>
                <div>
                  <p>Ciśnienie</p>
                  <p>Indeks UV</p>
                  <p>Widoczność</p>
                </div>
                <div>
                  <p>{`${hour.pressure || "- "} hPa`}</p>
                  <p>{`${hour.uvi || "0"} UVI`}</p>
                  <p>{`${hour.visibility / 1000 || "- "} km`}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : isLoading ? (
        <div className="skeleton-display">
          <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: "0.1rem" }} />
            <Skeleton variant="rectangular" width={"auto"} height={120} />
            <Skeleton variant="rectangular" width={"auto"} height={120} />
          </Stack>
        </div>
      ) : (
        <div className="options">
          <p>add location first:</p>
          <Link to="edit">
            <button>Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
}
