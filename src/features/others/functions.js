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
  // console.log("data", unixTime);
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
function isValidLatitude(input) {
  // Remove any leading or trailing whitespace
  // console.log("typ", typeof input);
  if (!input) {
    return false;
  }
  input = input.trim();

  // Replace any comma (",") with a dot (".") for consistency
  input = input.replace(",", ".");

  // Check if the input is a number within the valid latitude range (-90 to 90)
  const latitude = parseFloat(input);
  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    return false;
  }

  // Check if the input has valid formatting
  const regex = /^[-+]?\d+(\.\d+)?$/; // Allows for positive/negative numbers with or without decimals
  if (!regex.test(input)) {
    return false;
  }

  return true;
}
function isValidLongitude(input) {
  // Remove any leading or trailing whitespace
  if (!input) {
    return false;
  }
  input = input.trim();

  // Replace any comma (",") with a dot (".") for consistency
  input = input.replace(",", ".");

  // Check if the input is a number within the valid longitude range (-180 to 180)
  const longitude = parseFloat(input);
  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    return false;
  }

  // Check if the input has valid formatting
  const regex = /^[-+]?\d+(\.\d+)?$/; // Allows for positive/negative numbers with or without decimals
  if (!regex.test(input)) {
    return false;
  }

  return true;
}
function isValidCity(input) {
  if (!input) {
    return false;
  }

  input = input.trim();

  if (input.length < 3) {
    return false;
  }

  return true;
}
export {
  convertedDate,
  convertWindDegreeToDirection,
  isValidLatitude,
  isValidLongitude,
  isValidCity,
};
