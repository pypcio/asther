import {
  Outlet,
  useLoaderData,
  Form,
  NavLink,
  useNavigation,
  useSubmit,
  useNavigate,
  useLocation,
} from "react-router-dom";
//api

import { useEffect, useRef, useState } from "react";
import DropDownMenu from "../../../components/dropDownMenu";
//images
import { BsThreeDots } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import astherLogo from "../../../assets/logo-5.svg";
import { Box, Button, Modal } from "@mui/material";

import DownloadButton from "../../../components/downloadButton.jsx";
import {
  useCreateUserDataMutation,
  useGetAllUserDataQuery,
  useUpdateAllUserDataMutation,
} from "../../../features/servises/userApiSlice.js";
import * as servises from "../../../APIs/weatherAPI";

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return { q };
};
export default function Root() {
  // const [weathers, setWeathers] = useState([]);
  const [updateAllUserData] = useUpdateAllUserDataMutation();
  const { q } = useLoaderData();
  const { data, isSuccess, isFetching, refetch } = useGetAllUserDataQuery({
    refetchOnFocus: true,
  });
  const weathers = data ?? [];
  const [createUserData] = useCreateUserDataMutation();
  const [open, setOpen] = useState(false);
  const dialogRefs = useRef([]);
  const navigation = useNavigation();
  const locate = useLocation();
  const submit = useSubmit();
  const navigate = useNavigate();
  // console.log("weathers", weathers);
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  //=========================REFRESH DATA Z OPEN-WEATHER-API==========================================
  //====================WYLACZONA W CELU ZMNIEJSZENIA ZUZYCIA CALLI===============================

  useEffect(() => {
    const updateWeatherData = async () => {
      // console.log("weathers: ", weathers);
      try {
        const fetchData = weathers.map(async (weather) => {
          if (weather.location.city !== undefined) {
            const updateWeather = await servises.useWeatherApi({
              lat: weather.location.lat,
              lon: weather.location.lon,
            });
            // console.log("update weather", updateWeather);
            return updateWeather;
          } else {
            return weather;
          }
        });
        // Wait for all API calls to finish and return the results
        const results = await Promise.all(fetchData);
        // console.log("results", results);
        // Update the data on the server
        const updateAllData = updateAllUserData(results);
      } catch (error) {
        console.log(error);
      }
    };
    updateWeatherData();
  }, [isSuccess]);
  useEffect(() => {
    refetch();
  }, [locate.pathname]);
  useEffect(() => {
    let handlers = [];
    if (!isFetching) {
      weathers.forEach((_, index) => {
        const handler = (e) => {
          if (
            dialogRefs.current[index] &&
            !dialogRefs.current[index].contains(e.target)
          ) {
            dialogRefs.current[index].close();
          }
          if (dialogRefs.current[index].contains(e.target)) {
            setTimeout(() => {
              dialogRefs.current[index].close();
            }, 100);
          }
        };
        document.addEventListener("mousedown", handler);
        handlers.push(handler);
      });
    }
    return () => {
      handlers.forEach((handler) => {
        document.removeEventListener("mousedown", handler);
      });
    };
  }, [isFetching, isSuccess]);

  const handleNewLocation = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserData().unwrap();
      // console.log("nowa lokacja: ", response);
      navigate(`${response._id.toString()}/edit`);
    } catch (error) {
      console.log(error);
    }
  };
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleDialog = (index) => {
    dialogRefs.current[index]?.show();
  };
  // console.log("q: ", q);
  // console.log("weathers: ", weathers);
  return (
    <div id="wrap-app">
      <div id="application">
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
            <form id="search-form" role="search">
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
            </form>
            <Form onSubmit={handleNewLocation}>
              <button type="submit" name="intent" value="add">
                New
              </button>
            </Form>
          </div>
          <nav>
            {isSuccess ? (
              weathers.length === 0 ? (
                <p className="pa0">
                  <i>No locations added</i>
                </p>
              ) : (
                <ul>
                  {weathers
                    .filter((weather) => {
                      if (q && weather.location.city) {
                        return weather.location.city
                          .toLowerCase()
                          .includes(q.toLowerCase());
                      }
                      return weather;
                    })
                    .map((weather, index) => (
                      <li key={weather._id.toString()}>
                        <NavLink
                          to={`${weather._id.toString()}`}
                          className={({ isActive, isPending }) =>
                            isActive ? " active" : isPending ? " pending" : ""
                          }
                        >
                          {weather.location?.city ? (
                            <>{weather.location.city}</>
                          ) : (
                            <i>No City</i>
                          )}
                          {}
                        </NavLink>
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
                          <DropDownMenu id={weather._id.toString()} />
                        </dialog>
                      </li>
                    ))}
                </ul>
              )
            ) : null}
          </nav>
          <Button onClick={handleOpen}>
            {`Download weather`}
            <BsDownload />
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
      </div>
    </div>
  );
}
