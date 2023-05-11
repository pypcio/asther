import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { updateWeather } from "../APIs/dataAPI";
// import { useWeatherApi } from "../APIs/weatherAPI";

export async function action({ request, params }) {
  const formData = await request.formData();
  const update = Object.fromEntries(formData);
  await updateWeather(params.weatherId, update);
  //   console.log("szybki update: ", update);
  return redirect(`/weathers/${params.weatherId}/current`);
}
export default function EditWeatherRoot() {
  const { weather } = useLoaderData();
  //   console.log("wywoluje id: ", weather.id);
  const navigate = useNavigate();
  return (
    <div id="edit-form">
      <Form method="post" id="contact-form">
        <p>
          <span>Miejscowosc</span>
          <input
            placeholder="Miejscowosc"
            aria-label="First name"
            type="text"
            name="city"
            defaultValue={weather.city}
          />
        </p>
        <label>
          <span>Wspolrzedne</span>

          <input
            placeholder="dlugosc"
            aria-label="dlugosc"
            type="text"
            name="lat"
            defaultValue={weather.lat}
          />
          <input
            type="text"
            name="lng"
            placeholder="szerokosc"
            defaultValue={weather.lng}
          />
        </label>
        <p>
          <button type="submit">Save</button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </button>
        </p>
      </Form>
    </div>
  );
}
