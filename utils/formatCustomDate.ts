export const formatCustomDate = (date: Date, timeShiftMinutes: number = 0) => {
  const adjustedDate = new Date(date.getTime() + timeShiftMinutes * 60000);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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
