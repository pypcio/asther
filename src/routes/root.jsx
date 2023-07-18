import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
//api
import servises from "../APIs/servises.js";
import { getWeathers, createWeather } from "../APIs/dataAPI";
import { useEffect, useRef, useState } from "react";
import DropDownMenu from "../components/dropDownMenu";
//images
import { BsThreeDots } from "react-icons/bs";
import { BsDownload } from "react-icons/bs";
import astherLogo from "../assets/logo-5.svg";
import { Box, Button, Modal } from "@mui/material";
import DownloadButton from "../components/downloadButton.jsx";
import {
  useCreateUserDataMutation,
  useGetAllUserDataQuery,
} from "../features/servises/userApiSlice.js";
// import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
//

// export async function action({ request }) {
//   const formData = await request.formData();
//   let intent = formData.get("intent");
//   if (intent === "add") {
//     const weather = await servises.createLocation();
//     return redirect(`/weathers/${weather.id}/edit`);
//   }
//   if (intent === "delete") {
//     //nie potrzebne
//   }
// }
// export const loader =async ({ request }) => {
//     const url = new URL(request.url);
//     const q = url.searchParams.get("q");
//     const weathers = await servises.getAllLocation(q);
//     console.log("pokaz dane: ", weathers);
//     return { weathers, q };
//   };

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  return { q };
};

export default function Root() {
  // const [weathers, setWeathers] = useState([]);
  const { q } = useLoaderData();
  const {
    data: weathers,
    isSuccess,
    isFetching,
  } = useGetAllUserDataQuery({
    refetchOnMountOrArgChange: true,
  });
  const [createUserData] = useCreateUserDataMutation();
  const [open, setOpen] = useState(false);
  const dialogRefs = useRef([]);
  const navigation = useNavigation();
  const submit = useSubmit();
  const navigate = useNavigate();
  console.log("dane:", weathers);
  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  useEffect(() => {
    let handlers = [];
    if (!isFetching) {
      weathers.forEach((_, index) => {
        const handler = (e) => {
          // console.log(dialogRefs.current[index].contains(e.target));
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
  }, [isFetching]);

  const handleNewLocation = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserData().unwrap();
      console.log("nowa lokacja: ", response);
      navigate(`weathers/${response._id.toString()}/edit`);
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
              <ul>
                {weathers.map((weather, index) => (
                  <li key={weather._id.toString()}>
                    <NavLink
                      to={`/user/weathers/${weather._id.toString()}`}
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
      </div>
    </div>
  );
}
