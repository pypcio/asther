import { deleteWeather } from "../APIs/dataAPI";
import { redirect } from "react-router-dom";
import servises from "../APIs/servises";

export async function action({ params }) {
  // throw new Error("oh dang!");
  await servises.deleteLocation(params.weatherId);
  return redirect("/");
}
