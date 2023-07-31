import { Link, useNavigation, useParams } from "react-router-dom";
// import { getWeather } from "../APIs/dataAPI";
import { convertWindDegreeToDirection, convertedDate } from "../APIs/functions";
// import servises from "../APIs/servises";
import { useGetUserDataQuery } from "../features/servises/userApiSlice";
// export async function loader({ params }) {
//   // console.log("twoje id: ", params.weatherId);
//   const weather = await servises.getOneLocation(params.weatherId);
//   // console.log(weather);
//   return weather;
// }
export default function DailyWeather() {
  const { weatherId } = useParams();
  const { data: oneLocation, isLoading } = useGetUserDataQuery(weatherId, {
    skip: !weatherId, // Skip the query if weatherId is not available
    refetchOnMountOrArgChange: true,
  });
  const { daily, timezone_offset } = oneLocation?.location ?? [];
  const navigation = useNavigation();
  // console.log(daily);
  // console.log("location: ", navigation.location);
  // console.log("state: ", navigation.state);
  return (
    <div className="data-parent">
      {!isLoading && daily[0].weather.length !== 0 ? (
        daily.map((day, index) => {
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
