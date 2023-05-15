import React from "react";
import ReactDOM from "react-dom/client";
import "../src/style/index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
      loader={rootLoader}
      action={rootAction}
    >
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route
          path="/weathers/:weatherId"
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
            path="/weathers/:weatherId/hourly"
            element={<HourlyWeather />}
            loader={hourlyWeatherLoader}
          />
          <Route
            path="/weathers/:weatherId/daily"
            element={<DailyWeather />}
            loader={dailyWeatherLoader}
          />
        </Route>
        <Route
          path="/weathers/:weatherId/edit"
          element={<EditWeatherRoot />}
          loader={editWeatherLoader}
          action={editWeatherRootAction}
        />
        <Route
          path="/weathers/:weatherId/delete"
          action={deleteAction}
          errorElement={<ErrorPage />}
        />
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
