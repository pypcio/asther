import { Link, useParams } from "react-router-dom";
// import { getWeather } from "../APIs/dataAPI";
import {
  convertWindDegreeToDirection,
  convertedDate,
} from "../../../features/others/functions";
// import servises from "../APIs/servises";
import { useGetUserDataQuery } from "../../../features/servises/userApiSlice";
import { Skeleton, Stack } from "@mui/material";

export default function DailyWeather() {
  const { weatherId } = useParams();
  const { data: oneLocation, isLoading } = useGetUserDataQuery(weatherId, {
    skip: !weatherId, // Skip the query if weatherId is not available
    refetchOnMountOrArgChange: true,
  });
  const { daily, timezone_offset } = oneLocation?.location ?? [];
  return (
    <div className="data-parent">
      {!isLoading && daily[0] ? (
        daily.map((day) => {
          const date = day?.dt
            ? convertedDate(day.dt + timezone_offset)
            : convertedDate(null);
          // console.log("sprawdzam", new Date(day.dt * 1000));
          return (
            <div key={day.dt}>
              <div className="data-display">
                <div>
                  <p>{date}</p>
                </div>
                <div>
                  <p>
                    {day.weather && (
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        alt={`${day.weather[0].description || "-"}`}
                      />
                    )}
                  </p>
                </div>
                <div>
                  <p>{`${day.temp.day || "- "} °C`}</p>
                </div>
                <div>
                  <p>Zachmurzenie</p>
                  <p>Wilgotnosc</p>
                  <p>Deszcz</p>
                </div>
                <div>
                  <p>{`${day.clouds || "0"} %`}</p>
                  <p>{`${day.humidity || "0"} %`}</p>
                  <p>{`${Math.round(day.pop * 100) || "0 "} %`}</p>
                </div>
                <div>
                  <p>Kierunek wiatru</p>
                  <p>Prędkość wiatru</p>
                  <p>Podmuch wiatru</p>
                </div>
                <div>
                  <p>{convertWindDegreeToDirection(day.wind_deg) || "- "}</p>
                  <p>{`${day.wind_speed || "0"} m/s`}</p>
                  <p>{`${day.wind_gust || "0"} m/s`}</p>
                </div>
                <div>
                  <p>Ciśnienie</p>
                  <p>Indeks UV</p>
                  <p>Opady</p>
                </div>
                <div>
                  <p>{`${day.pressure || "- "} hPa`}</p>
                  <p>{`${day.uvi || "0"} UVI`}</p>
                  <p>{`${day.rain || "0 "} mm`}</p>
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
