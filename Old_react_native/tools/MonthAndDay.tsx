// @ts-ignore
export const MonthSelect = (month) => {
  var _month = new Array(11);
  _month[0] = "January";
  _month[1] = "February";
  _month[2] = "March";
  _month[3] = "April";
  _month[4] = "May";
  _month[5] = "June";
  _month[6] = "July";
  _month[7] = "August";
  _month[8] = "September";
  _month[9] = "October";
  _month[10] = "November";
  _month[11] = "December";
  var n = _month[month];
  return n;
};

// @ts-ignore
export const DaySelect = (day) => {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var n = weekday[day];
  return n;
};
