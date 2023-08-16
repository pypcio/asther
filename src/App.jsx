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
import { decodeToken } from "./features/others/decodeToken.js";
import SuccessReg from "./routes/home/successReg.jsx";
function App() {
  const token = useSelector(selectCurrentToken);
  const refreshToken = useSelector(selectRefreshToken);
  const [cookieToken] = useCookies(["jwt-authorization"]);
  const [cookieRefreshToken] = useCookies(["jwt-refreshToken"]);
  const dispatch = useDispatch();
  useEffect(() => {
    const decodeCookie = async () => {
      if (token || refreshToken) return;

      const cookies = [
        { cookie: cookieToken["jwt-authorization"], type: "token" },
        {
          cookie: cookieRefreshToken["jwt-refreshToken"],
          type: "refreshToken",
        },
      ];

      for (const { cookie, type } of cookies) {
        if (!cookie) continue;

        try {
          const decoded = decodeToken(cookie);
          const credentials = { user: { ...decoded.user } };

          if (type === "token") {
            credentials.token = cookie;
            credentials.refreshToken = cookieRefreshToken["jwt-refreshToken"];
          } else {
            credentials.refreshToken = cookie;
          }
          // console.log("credentials:", credentials);
          dispatch(setCredentials(credentials));
        } catch (error) {
          console.log(error);
        }
      }
    };

    decodeCookie();
  }, [token, refreshToken, cookieToken, cookieRefreshToken, dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="navigate-home" element={<SuccessReg />} />
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
