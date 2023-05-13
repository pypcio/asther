import {
  Link,
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getWeathers, createWeather } from "../APIs/dataAPI";
import { useEffect } from "react";

export async function action() {
  const weather = await createWeather();
  return redirect(`weathers/${weather.id}/edit`);
}
export async function loader({ request }) {
  // console.log("update root");
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const weathers = await getWeathers(q);
  // console.log("dane? ", weathers);
  return { weathers, q };
}
export default function Root() {
  const { weathers, q } = useLoaderData();
  // console.log("pogoda All", weathers);
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Weather</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {weathers.length ? (
            <ul>
              {weathers.map((weather) => (
                <li key={weather.id}>
                  <NavLink
                    to={`weathers/${weather.id}/current`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {weather.city ? <>{weather.city}</> : <i>No City</i>}
                    {}
                    <span>...</span>
                  </NavLink>
                  {/* <div className="setting">
                    <a>&#8230;</a>
                  </div> */}
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No weathers</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
