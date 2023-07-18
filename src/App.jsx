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
import Register, { action as registerAction } from "./routes/register.jsx";
//components
import Layout from "./components/layout.jsx";
import RequireAuth from "./routes/requireAuth.jsx";
import Welcome from "./routes/Welcome.jsx";
// import User from "./routes/user.jsx";
// import Home from "./routes/home.jsx";
// import RequireAuth from "./routes/requireAuth.jsx";
// import useAxiosPrivate from "./hooks/useAxiosPrivate.js";
// import useAuth from "./hooks/useAuth.js";

function App() {
  // const [auth, setAuth] = useAuth();
  // const axiosPrivate = useAxiosPrivate();
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
            action={registerAction}
          />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="welcome" element={<Welcome />} />
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
                path="weathers/:weatherId"
                element={<WeatherRoot />}
                // loader={weatherRootLoader}
              >
                <Route
                  index
                  element={<CurrentWeather />}
                  // loader={currentWeatherLoader}
                />
                <Route
                  path="weathers/:weatherId/hourly"
                  element={<HourlyWeather />}
                  // loader={hourlyWeatherLoader}
                />
                <Route
                  path="weathers/:weatherId/daily"
                  element={<DailyWeather />}
                  // loader={dailyWeatherLoader}
                />
              </Route>
              <Route
                path="weathers/:weatherId/edit"
                element={<EditWeatherRoot />}
                // loader={editWeatherLoader}
                // action={editWeatherRootAction}
              />
              <Route
                path="weathers/:weatherId/delete"
                // action={deleteAction}
                errorElement={<ErrorPage />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
