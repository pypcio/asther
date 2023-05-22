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
import { getWeathers, createWeather, deleteWeather } from "../APIs/dataAPI";
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "../components/dropDownMenu";
//images
// import astherLogo from "../assets/logo-weather-app-1-2.svg";
import { BsDownload } from "react-icons/bs";
import astherLogo from "../assets/logo-5.svg";
import { Box, Button, Modal, Typography } from "@mui/material";
import DownloadButton from "../components/DownloadButton";
export async function action({ request }) {
  const formData = await request.formData();
  let intent = formData.get("intent");
  // console.log(intent);
  // console.log("intent: ", intent);
  if (intent === "add") {
    const weather = await createWeather();
    return redirect(`weathers/${weather.id}/edit`);
  }
  if (intent === "delete") {
    //dziala? xd
  }
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
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
        <footer id="logo">
          {/* <Link>
            <AiFillGithub />
          </Link> */}
          <img src={astherLogo} className="logo" alt="Asther logo" />
          <h4>Asther</h4>
        </footer>
        {/* <h1>Asther</h1> */}
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              autoComplete="off"
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
            <button type="submit" name="intent" value="add">
              New
            </button>
          </Form>
        </div>
        <nav>
          {weathers.length ? (
            <ul>
              {weathers.map((weather) => (
                <li key={weather.id}>
                  <NavLink
                    to={`weathers/${weather.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? " active" : isPending ? " pending" : ""
                    }
                  >
                    {weather.city ? <>{weather.city}</> : <i>No City</i>}
                    {}
                  </NavLink>
                  <DropDownMenu id={weather.id} />
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No locations added</i>
            </p>
          )}
        </nav>
        <Button onClick={handleOpen}>
          {`Download weather`} <BsDownload />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <DownloadButton />
          </Box>
        </Modal>
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
