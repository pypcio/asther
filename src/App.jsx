import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
//routes
import Root, { loader as rootLoader } from "./routes/root.jsx";
import ErrorPage from "./routes/errorPage";
import WeatherRoot from "./routes/weatherRoot";
import CurrentWeather from "./routes/currentWeather";
import HourlyWeather from "./routes/hourlyWeather";
import DailyWeather from "./routes/dailyWeather";
import EditWeatherRoot from "./routes/edit";
// import { action as deleteAction } from "./routes/delete";
import Index from "./routes";
import SignIn from "./routes/signIn.jsx";
import Register from "./routes/register.jsx";
//components
import Layout from "./components/layout.jsx";
import RequireAuth from "./routes/requireAuth.jsx";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUser,
  selectRefreshToken,
  setCredentials,
} from "./features/authSlice.js";
import { useEffect } from "react";
import PanelRoot from "./routes/panelRoot.jsx";
import Profile from "./routes/profile.jsx";
import Settings from "./routes/settings.jsx";
import PanelLayout from "./components/panelLayout.jsx";
import * as jose from "jose";
import Welcome from "./routes/Welcome.jsx";
// import User from "./routes/user.jsx";
// import Home from "./routes/home.jsx";
// import RequireAuth from "./routes/requireAuth.jsx";
// import useAxiosPrivate from "./hooks/useAxiosPrivate.js";
// import useAuth from "./hooks/useAuth.js";

function App() {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const refreshToken = useSelector(selectRefreshToken);
  // console.log("refreshToken", refreshToken);
  const [cookieToken] = useCookies(["jwt-authorization"]);
  const [cookieRefreshToken] = useCookies(["jwt-refreshToken"]);
  const dispatch = useDispatch();
  const currentTime = Date.now();
  const secret = new TextEncoder().encode(
    import.meta.env.VITE_REACT_APP_VERIFY_TOKEN
  );
  // console.log("token:", token);
  // console.log("user:", user);
  // console.log("cookieRefreshToken", cookieRefreshToken["jwt-refreshToken"]);
  // console.log("cookieToken", cookieToken["jwt-authorization"]);
  useEffect(() => {
    const decodeCookie = async () => {
      if (!token || !refreshToken) {
        if (
          cookieToken["jwt-authorization"] &&
          cookieRefreshToken["jwt-refreshToken"]
        ) {
          try {
            const decodeToken = await jose.jwtVerify(
              cookieToken["jwt-authorization"],
              secret
            );
            // console.log("decodeToken", decodeToken.payload.user);
            dispatch(
              setCredentials({
                user: { ...decodeToken.payload.user },
                token: cookieToken["jwt-authorization"],
                refreshToken: cookieRefreshToken["jwt-refreshToken"],
              })
            );
          } catch (error) {
            console.log(error);
          }
        } else if (cookieRefreshToken["jwt-refreshToken"]) {
          try {
            const decodeRefreshToken = await jose.jwtVerify(
              cookieRefreshToken["jwt-refreshToken"],
              secret
            );
            // console.log("decodeRefreshToken", decodeRefreshToken.payload.user);
            dispatch(
              setCredentials({
                user: { ...decodeRefreshToken.payload.user },
                refreshToken: cookieRefreshToken["jwt-refreshToken"],
              })
            );
          } catch (error) {
            console.log(error);
          }
        }
      }
    };
    decodeCookie();
  }, []);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route path="/" element={<Layout />}>
          <Route
            path="signIn"
            element={<SignIn />}
            // action={signInAction(setAuth)}
          />
          <Route
            path="register"
            element={<Register />}
            // action={registerAction}
          />
          <Route path="welcome" element={<Welcome />} />
        </Route>
        <Route element={<RequireAuth />}>
          {/* <Route path="user" element={<User />} /> */}
          <Route
            path="user"
            element={<Root />}
            loader={rootLoader}
            // action={rootAction}
          >
            <Route errorElement={<ErrorPage />}>
              <Route index element={<Index />} />
              <Route
                path=":weatherId"
                element={<WeatherRoot />}
                // loader={weatherRootLoader}
              >
                <Route
                  index
                  element={<CurrentWeather />}
                  // loader={currentWeatherLoader}
                />
                <Route path="hourly" element={<HourlyWeather />} />
                <Route path="daily" element={<DailyWeather />} />
              </Route>
              <Route path=":weatherId/edit" element={<EditWeatherRoot />} />
              <Route path=":weatherId/delete" errorElement={<ErrorPage />} />
            </Route>
          </Route>
          <Route element={<PanelRoot />}>
            <Route path="panel" element={<PanelLayout />}>
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Route>
        <Route errorElement={<ErrorPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
