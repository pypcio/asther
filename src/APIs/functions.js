function convertedDate(time) {
  let unixTime = 0;
  const daysOfWeek = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  time ? (unixTime = new Date(time * 1000)) : (unixTime = new Date());
  console.log("data", unixTime);
  const utcDayOfWeek = daysOfWeek[unixTime.getUTCDay()];
  const utcDayOfMonth = unixTime.getUTCDate();
  const utcMonth = unixTime.getUTCMonth() + 1;
  const utcYear = unixTime.getUTCFullYear();
  const formattedDate = `${utcDayOfWeek}, ${utcDayOfMonth}/${utcMonth}/${utcYear}`;
  return formattedDate;
}
function convertWindDegreeToDirection(degree) {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round((degree % 360) / 45) % 8;
  return directions[index];
}
export { convertedDate, convertWindDegreeToDirection };
