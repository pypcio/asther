import { Link, useParams } from "react-router-dom";
// import { getWeather } from "../APIs/dataAPI";
import { convertWindDegreeToDirection } from "../APIs/functions";
// import DownloadButton from "../components/DownloadButton";
import { useGetUserDataQuery } from "../features/servises/userApiSlice";

export default function CurrentWeather() {
  const { weatherId } = useParams();

  const { data: oneLocation, isLoading } = useGetUserDataQuery(weatherId, {
    skip: !weatherId, // Skip the query if weatherId is not available
    refetchOnMountOrArgChange: true,
  });
  const { current, timezone_offset } = oneLocation?.location ?? {};

  return (
    <>
      {/* <DownloadButton id={id} showModal={showModal} handleModal={handleModal} /> */}
      {!isLoading && current.weather.length !== 0 ? (
        <div id="data-current" className="data-parent">
          <div className="data-display">
            <div>
              <p>{`${new Date(
                (current.dt + timezone_offset) * 1000
              ).getUTCHours()}:${new Date((current.dt + timezone_offset) * 1000)
                .getUTCMinutes()
                .toString()
                .padStart(2, "0")}`}</p>
            </div>
            <div>
              <p>
                {current.weather && (
                  <img
                    src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                    alt={`${current.weather[0].description || "-"}`}
                  />
                )}
              </p>
            </div>
            <div>
              <p>{`${current.temp || "0"}°C`}</p>
            </div>
            <div>
              <p>Zachmurzenie</p>
              <p>Wilgotnosc</p>
              <p>Odczuwalna</p>
            </div>
            <div>
              <p>{`${current.clouds || "0"}%`}</p>
              <p>{`${current.humidity || "0"}%`}</p>
              <p>{`${current.feels_like || "0"}°C`}</p>
            </div>
            <div>
              <p>Kierunek wiatru</p>
              <p>Prędkość wiatru</p>
              <p>Podmuch wiatru</p>
            </div>
            <div>
              <p>{convertWindDegreeToDirection(current.wind_deg)}</p>
              <p>{`${current.wind_speed || "0"}m/s`}</p>
              <p>{`${current.wind_gust || "0"}m/s`}</p>
            </div>
            <div>
              <p>Ciśnienie</p>
              <p>Indeks UV</p>
              <p>Widoczność</p>
            </div>
            <div>
              <p>{`${current.pressure || "- "}hPa`}</p>
              <p>{`${current.uvi || "0"} UVI`}</p>
              <p>{`${current.visibility / 1000 || "- "}km`}</p>
            </div>
          </div>
        </div>
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
