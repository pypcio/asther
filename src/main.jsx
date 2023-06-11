import React from "react";
import ReactDOM from "react-dom/client";
import "../src/style/index.css";
import "tachyons";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
//routes
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root.jsx";
import ErrorPage from "./routes/errorPage";
import WeatherRoot, { loader as weatherRootLoader } from "./routes/weatherRoot";
import CurrentWeather, {
  loader as currentWeatherLoader,
} from "./routes/currentWeather";
import HourlyWeather, {
  loader as hourlyWeatherLoader,
} from "./routes/hourlyWeather";
import DailyWeather, {
  loader as dailyWeatherLoader,
} from "./routes/dailyWeather";
import EditWeatherRoot, {
  action as editWeatherRootAction,
  loader as editWeatherLoader,
} from "./routes/edit";
import { action as deleteAction } from "./routes/delete";
import Index from "./routes";
import SignIn, { action as signInAction } from "./routes/signIn.jsx";
import Register, { action as registerAction } from "./routes/register.jsx";
//components
import Layout from "./components/layout.jsx";
import Home from "./routes/home.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Home />} /> */}
        <Route path="signIn" element={<SignIn />} action={signInAction} />
        <Route path="register" element={<Register />} action={registerAction} />
      </Route>
      <Route
        path="/:userId"
        element={<Root />}
        errorElement={<ErrorPage />}
        loader={rootLoader}
        action={rootAction}
      >
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Index />} />
          <Route
            path="/:userId/:weatherId"
            element={<WeatherRoot />}
            loader={weatherRootLoader}
          >
            <Route
              index
              // path="/weathers/:weatherId/current"
              element={<CurrentWeather />}
              loader={currentWeatherLoader}
            />
            <Route
              path="/:userId/:weatherId/hourly"
              element={<HourlyWeather />}
              loader={hourlyWeatherLoader}
            />
            <Route
              path="/:userId/:weatherId/daily"
              element={<DailyWeather />}
              loader={dailyWeatherLoader}
            />
          </Route>
          <Route
            path="/:userId/:weatherId/edit"
            element={<EditWeatherRoot />}
            loader={editWeatherLoader}
            action={editWeatherRootAction}
          />
          <Route
            path="/:userId/:weatherId/delete"
            action={deleteAction}
            errorElement={<ErrorPage />}
          />
        </Route>
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
