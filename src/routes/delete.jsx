import { deleteWeather } from "../APIs/dataAPI";
import { redirect } from "react-router-dom";

export async function action({ params }) {
  // throw new Error("oh dang!");
  await deleteWeather(params.weatherId);
  return redirect("/");
}
