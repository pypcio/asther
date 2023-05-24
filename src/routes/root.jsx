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
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "../components/dropDownMenu";
//images
// import astherLogo from "../assets/logo-weather-app-1-2.svg";
import { BsThreeDots } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import astherLogo from "../assets/logo-5.svg";
import { Box, Button, Modal } from "@mui/material";
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
    //nie potrzebne
  }
}
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const weathers = await getWeathers(q);
  return { weathers, q };
}
export default function Root() {
  const { weathers, q } = useLoaderData();
  const [open, setOpen] = useState(false);
  const dialogRefs = useRef([]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDialog = (index) => {
    console.log(dialogRefs.current[index]);
    dialogRefs.current[index]?.show();
  };
  const navigation = useNavigation();
  const submit = useSubmit();
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);
  useEffect(() => {
    let handlers = [];

    weathers.forEach((_, index) => {
      const handler = (e) => {
        if (
          dialogRefs.current[index] &&
          !dialogRefs.current[index].contains(e.target)
        ) {
          dialogRefs.current[index].close();
        }
      };
      document.addEventListener("mousedown", handler);
      handlers.push(handler);
    });

    return () => {
      handlers.forEach((handler) => {
        document.removeEventListener("mousedown", handler);
      });
    };
  }, [weathers]);
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
              {weathers.map((weather, index) => (
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
                  {/* tutaj ma byc html dialog  */}
                  <div
                    className="drop-menu-button"
                    onClick={() => handleDialog(index)}
                  >
                    <BsThreeDots />
                  </div>
                  <dialog
                    id="modal-drop-menu"
                    ref={(el) => (dialogRefs.current[index] = el)}
                  >
                    <DropDownMenu id={weather.id} />
                  </dialog>
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
