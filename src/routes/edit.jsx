import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWeather, updateWeather } from "../APIs/dataAPI";
import {
  isValidCity,
  isValidLatitude,
  isValidLongitude,
} from "../APIs/functions";
import { useEffect, useState, useRef } from "react";

export async function action({ request, params }) {
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  return { update };
}

export async function loader({ params }) {
  const weather = await getWeather(params.weatherId);
  return { weather };
}
function EditWeatherRoot() {
  const { weather } = useLoaderData();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  //location
  const [city, setCity] = useState(weather.city);
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);
  //lattitude
  const [lat, setLat] = useState(`${weather.lat || ""}`);
  const [validLat, setValidLat] = useState(false);
  const [latFocus, setLatFocus] = useState(false);
  //longitude
  const [lon, setLon] = useState(`${weather.lon || ""}`);
  const [validLon, setValidLon] = useState(false);
  const [lonFocus, setLonFocus] = useState(false);
  //error message
  const [errMsg, setErrMsg] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    const result = isValidCity(city);
    console.log("result", result);
    console.log("city", city);
    setValidCity(result);
  }, [city]);
  useEffect(() => {
    const result = isValidLatitude(lat);
    console.log("result", result);
    console.log("lat", lat);
    setValidLat(result);
  }, [lat]);
  useEffect(() => {
    const result = isValidLongitude(lon);
    console.log("result", result);
    console.log("lon", lon);
    setValidLon(result);
  }, [lon]);
  useEffect(() => {
    setErrMsg("");
  }, [city, lat, lon]);
  const handleSubmit = () => {};
  return (
    <section id="edit-form">
      <form id="data-form" onSubmit={handleSubmit}>
        <div>
          <label>Miejscowosc:</label>
          <p id="city">
            <input
              placeholder="Miejscowosc"
              type="text"
              name="city"
              // id="city"
              ref={userRef}
              defaultValue={city}
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

          <p
            id="uidnote"
            className={
              cityFocus && city && !validCity ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            3 to 30 characters. <br />
            Must begin with capital letter <br />
          </p>
        </div>

        <div id="wspolrzedne">
          <label>Wspolrzedne</label>
          {/* <label htmlFor="lat">
            Szerokosc
            <span className={validLat ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validLat || !lat ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label> */}
          <div>
            <p>
              <input
                ref={userRef}
                placeholder="szerokość"
                aria-label="lat"
                type="text"
                name="lat"
                id="lat"
                defaultValue={lat}
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
            <p>
              <input
                placeholder="Długość"
                type="text"
                name="lon"
                id="lon"
                ref={userRef}
                defaultValue={lon}
                autoComplete="off"
                required
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
            {/* <label htmlFor="lon">
            Długość
            <span className={validLon ? "valid" : "hide"}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span className={validLon || !lon ? "hide" : "invalid"}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label> */}
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

        <p>
          <button type="submit">Save</button>
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
  );
}
export default EditWeatherRoot;
