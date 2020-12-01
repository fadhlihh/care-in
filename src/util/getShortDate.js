const giveZero = (number) => {
  if (number.toString().length === 1) {
    return `0${number}`;
  }
  return number;
};

const getShortDate = (date) => {
  const month = giveZero(date.getMonth() + 1);
  const day = giveZero(date.getDate());
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export default getShortDate;
