import moment from 'moment/min/moment-with-locales';

const giveZero = (number) => {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
};

// Convert long dates from date picker to given date format from API
const getShortDate = (date) => {
  const month = giveZero(date.getMonth() + 1);
  const day = giveZero(date.getDate());
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

// convert Date (object) to legible date format (indonesia format: 9 Maret 2019).
const getLegibleDate = (date) => {
  return moment(date).locale('id').format('LL');
};

const DateFormatter = {
  giveZero,
  getShortDate,
  getLegibleDate
};

export default DateFormatter;
