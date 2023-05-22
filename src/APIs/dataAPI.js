import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { useWeatherApi } from "../APIs/weatherAPI";

export async function getWeathers(query) {
  // console.log("wchodzi tu?");
  // await fakeNetwork(`getweathers:${query}`);
  let weathers = await localforage.getItem("weathers");
  if (!weathers) weathers = [];
  // console.log("co sie dzieje z lon:", weathers[2]);
  const fetchData = weathers.map((weather) =>
    updateWeather(weather.id, {
      city: weather.city,
      lat: weather.lat?.toString(),
      lon: weather.lon?.toString(),
    })
  );
  let allData = await Promise.all(fetchData);
  // console.log(allData);
  if (query) {
    allData = matchSorter(allData, query, { keys: ["city", "id"] });
  }
  return allData.sort(sortBy("city", "createdAt"));
}

export async function getWeathersOnly(query) {
  // console.log("wchodzi tu?");
  // await fakeNetwork(`getweathers:${query}`);
  let weathers = await localforage.getItem("weathers");
  if (!weathers) weathers = [];
  if (query) {
    weathers = matchSorter(weathers, query, { keys: ["city", "id"] });
  }
  return weathers.sort(sortBy("city", "createdAt"));
}

export async function createWeather() {
  // await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let weather = { id, createdAt: Date.now() };
  let weathers = await getWeathers();
  weathers.unshift(weather);
  await set(weathers);
  // console.log("stworz: ", weather);
  return weather;
}

export async function getWeather(id) {
  // await fakeNetwork(`weather:${id}`);
  let weathers = await localforage.getItem("weathers");
  let weather = weathers.find((weather) => weather.id === id);
  // console.log("odczyt 1 lokacji: ", weather);
  return weather ?? null;
}

export async function updateWeather(id, updates) {
  // await fakeNetwork();
  // console.log("pokaz: ", updates);
  const weatherData = await useWeatherApi(updates);
  // console.log("updated weather", weatherData);
  let weathers = await localforage.getItem("weathers");
  let weather = weathers.find((weather) => weather.id === id);
  if (!weather) throw new Error("No weather found for", id);
  const temp = { city: updates.city, ...weatherData };
  // console.log("calosc: ", temp);
  Object.assign(weather, temp);
  await set(weathers);
  return weather;
}
export async function updateAllWeather(query) {
  let weathers = await localforage.getItem("weathers");
  if (!weathers) weathers = [];
  if (query) {
    weathers = matchSorter(weathers, query, { keys: ["city", "createdAt"] });
  }
  return weathers.sort(sortBy("city", "createdAt"));
}

export async function deleteWeather(id) {
  let weathers = await localforage.getItem("weathers");
  let index = weathers.findIndex((weather) => weather.id === id);
  if (index > -1) {
    weathers.splice(index, 1);
    await set(weathers);
    return true;
  }
  return false;
}

function set(weathers) {
  return localforage.setItem("weathers", weathers);
}

// fake a cache so we don't slow down stuff we've already seen
// let fakeCache = {};

// async function fakeNetwork(key) {
//   if (!key) {
//     fakeCache = {};
//   }

//   if (fakeCache[key]) {
//     return;
//   }

//   fakeCache[key] = true;
//   return new Promise((res) => {
//     setTimeout(res, Math.random() * 10);
//   });
// }
// export function concatObjects(obj1, obj2) {
//   const result = { ...obj1 };
//   for (let key in obj2) {
//     if (!result.hasOwnProperty(key)) {
//       result[key] = obj2[key];
//     }
//   }
//   return result;
// }
