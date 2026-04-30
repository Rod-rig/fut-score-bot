export const formatCustomDate = (date: Date, timeShiftMinutes: number = 0) => {
  const adjustedDate = new Date(date.getTime() + timeShiftMinutes * 60000);

  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekday = weekdays[adjustedDate.getDay()];
  const month = months[adjustedDate.getMonth()];
  const day = adjustedDate.getDate();
  const year = adjustedDate.getFullYear();
  const hours = adjustedDate.getHours().toString().padStart(2, "0");
  const minutes = adjustedDate.getMinutes().toString().padStart(2, "0");

  return {
    date: `${weekday}, ${month} ${day}, ${year}`,
    hours: `${hours}:${minutes}`,
  };
};
