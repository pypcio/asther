import { useNavigate, useParams } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//API
import {
  isValidCity,
  isValidLatitude,
  isValidLongitude,
} from "../../../features/others/functions";
import { useEffect, useState, useRef } from "react";
import { geocodingGoogleApi } from "../../../APIs/weatherAPI";
import {
  useGetUserDataQuery,
  useUpdateUserDataMutation,
} from "../../../features/servises/userApiSlice";
import * as servises from "../../../APIs/weatherAPI";
// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const update = Object.fromEntries(formData);
//   console.log("update: ", update);
//   await servises.updateLocation(params.weatherId, update);
//   return redirect(`/weathers/${params.weatherId}`);
// }

// export async function loader({ params }) {
//   const weather = await servises.getOneLocation(params.weatherId);
//   return { weather };
// }
function EditWeatherRoot() {
  const { weatherId } = useParams();
  // console.log("editId: ", weatherId);
  const { data: weather, isLoading } = useGetUserDataQuery(weatherId, {
    skip: !weatherId, // Skip the query if weatherId is not available
  });
  const [updateUserData] = useUpdateUserDataMutation();
  const navigate = useNavigate();

  const userRef = useRef();
  //location
  const [city, setCity] = useState(weather?.location.city || "");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(true);
  //lattitude
  const [lat, setLat] = useState(`${weather?.location.lat || ""}`);
  const [validLat, setValidLat] = useState(false);
  const [latFocus, setLatFocus] = useState(false);
  //longitude
  const [lon, setLon] = useState(`${weather?.location.lon || ""}`);
  const [validLon, setValidLon] = useState(false);
  const [lonFocus, setLonFocus] = useState(false);
  //error message
  const [errMsg, setErrMsg] = useState(false);
  const [disable, setDisable] = useState(false);
  // console.log(navigator);
  useEffect(() => {
    userRef.current.focus();
  }, [isLoading]);
  useEffect(() => {
    async function locationValidationApi() {
      const test = await geocodingGoogleApi(city);
      if (test) {
        setLat(test.lat.toString());
        setLon(test.lng.toString());
        setDisable(true);
        // console.log("lat,lon: ", lat, lon);
      } else {
        setDisable(false);
        setLat("");
        setLon("");
      }
    }
    locationValidationApi();
    const result = isValidCity(city);
    setValidCity(result);
  }, [city]);
  useEffect(() => {
    const result = isValidLatitude(lat);
    setValidLat(result);
  }, [lat]);
  useEffect(() => {
    const result = isValidLongitude(lon);

    setValidLon(result);
  }, [lon]);
  useEffect(() => {
    setErrMsg("");
  }, [city, lat, lon]);

  const handleEditLocation = async (e) => {
    e.preventDefault();
    try {
      const updateWeather = await servises.useWeatherApi({ lat, lon });
      const updateLocation = updateUserData([
        weatherId,
        { city, ...updateWeather },
      ]).unwrap();
      // console.log("update:", updateLocation);
    } catch (error) {
      setErrMsg("failed to fetch data");
      console.log(error);
    }
    navigate(`/user/${weatherId}`, { replace: true });
  };
  // console.log("data?:", weather);
  return (
    <div id="edit-root">
      <section id="edit-form">
        <form onSubmit={handleEditLocation} id="data-form">
          <div>
            <label>Miejscowosc:</label>
            <p id="city">
              <input
                placeholder="Miejscowosc"
                type="text"
                name="city"
                // id="city"
                ref={userRef}
                defaultValue={weather?.location.city ?? city}
                // value={city}
                autoComplete="off"
                required
                onChange={(e) => setCity(e.target.value)}
                aria-label="city"
                aria-invalid={validCity ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setCityFocus(true)}
                onBlur={() => setCityFocus(false)}
              />
              <span className={validCity ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validCity || !city ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </p>
          </div>
          <p
            id="uidnote"
            className={
              cityFocus && city && !validCity ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            3 to 30 characters. <br />
            Best to begin with capital letter <br />
          </p>
          <div id="wspolrzedne">
            <label>Wspolrzedne:</label>
            <div>
              <div className="data-location">
                <p>
                  <input
                    // ref={userRef}
                    placeholder="szerokość"
                    aria-label="lat"
                    type="text"
                    name="lat"
                    id="lat"
                    readOnly={disable}
                    defaultValue={weather?.location.lat ?? lat}
                    // value={lat}
                    required
                    autoComplete="off"
                    onChange={(e) => setLat(e.target.value)}
                    aria-invalid={validLat ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setLatFocus(true)}
                    onBlur={() => setLatFocus(false)}
                  />
                  <span className={validLat ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validLat || !lat ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </p>
                <p
                  id="uidnote"
                  className={
                    latFocus && lat && !validLat ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Should be valid lattitude <br />
                  (between -90 to 90)
                  <br />
                </p>
              </div>
              <div>
                <p>
                  <input
                    placeholder="Długość"
                    type="text"
                    name="lon"
                    id="lon"
                    // ref={userRef}
                    defaultValue={weather?.location.lon ?? lon}
                    // value={lon}
                    autoComplete="off"
                    required
                    readOnly={disable}
                    onChange={(e) => setLon(e.target.value)}
                    aria-label="lon"
                    aria-invalid={validLon ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setLonFocus(true)}
                    onBlur={() => setLonFocus(false)}
                  />
                  <span className={validLon ? "valid" : "hide"}>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  <span className={validLon || !lon ? "hide" : "invalid"}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </p>

                <p
                  id="uidnote"
                  className={
                    lonFocus && lon && !validLon ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Should be valid lattitude value <br />
                  (between -180 to 180)
                  <br />
                </p>
              </div>
            </div>
          </div>

          <p>
            <button
              disabled={!validCity || !validLat || !validLon ? true : false}
              type="submit"
            >
              Save
            </button>
            <button
              className="cancel"
              type="button"
              onClick={() => {
                navigate(-1);
              }}
            >
              Cancel
            </button>
          </p>
        </form>
      </section>
    </div>
  );
}
export default EditWeatherRoot;
