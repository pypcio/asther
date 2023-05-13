function convertedDate(time) {
  //   console.log("time:", time);
  const daysOfWeek = [
    "Niedziela",
    "Poniedziałek",
    "Wtorek",
    "Środa",
    "Czwartek",
    "Piątek",
    "Sobota",
  ];
  //konwertowanie czasu
  const unixTime = new Date(time * 1000);
  //   console.log("czasUnix", unixTime);
  //data
  const dayOfWeek = daysOfWeek[unixTime.getDay()];
  const dayOfMonth = unixTime.getDate();
  const month = unixTime.getMonth() + 1;
  const year = unixTime.getFullYear();
  const formattedDate = `${dayOfWeek}, ${dayOfMonth}/${month}/${year}`;
  return formattedDate;
}

export { convertedDate };
