import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
//routes
import Root, { loader as rootLoader } from "./routes/userRoot/root/root.jsx";
import ErrorPage from "./routes/404/errorPage.jsx";
import WeatherRoot from "./routes/userRoot/weatherRoot/weatherRoot.jsx";
import CurrentWeather from "./routes/userRoot/weatherRoot/currentWeather.jsx";
import HourlyWeather from "./routes/userRoot/weatherRoot/hourlyWeather.jsx";
import DailyWeather from "./routes/userRoot/weatherRoot/dailyWeather.jsx";
import EditWeatherRoot from "./routes/userRoot/features/edit.jsx";
import Home from "./routes/home/home.jsx";
import Index from "./routes/userRoot/root/index.jsx";
import SignIn from "./routes/home/signIn.jsx";
import Register from "./routes/home/register.jsx";
//components
import Layout from "./components/layout.jsx";
import RequireAuth from "./routes/userRoot/root/requireAuth.jsx";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectRefreshToken,
  setCredentials,
} from "./features/reduxSlice/authSlice.js";
import { useEffect } from "react";
import PanelRoot from "./routes/userRoot/account/panelRoot.jsx";
import Profile from "./routes/userRoot/account/profile.jsx";
import Settings from "./routes/userRoot/account/settings.jsx";
import PanelLayout from "./components/panelLayout.jsx";
import * as jose from "jose";

function App() {
  const token = useSelector(selectCurrentToken);
  const refreshToken = useSelector(selectRefreshToken);
  // console.log("refreshToken", refreshToken);
  const [cookieToken] = useCookies(["jwt-authorization"]);
  const [cookieRefreshToken] = useCookies(["jwt-refreshToken"]);
  const dispatch = useDispatch();
  const secret = new TextEncoder().encode(
    import.meta.env.VITE_REACT_APP_VERIFY_TOKEN
  );

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
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="user" element={<Root />} loader={rootLoader}>
            <Route errorElement={<ErrorPage />}>
              <Route index element={<Index />} />
              <Route path=":weatherId" element={<WeatherRoot />}>
                <Route index element={<CurrentWeather />} />
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
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
