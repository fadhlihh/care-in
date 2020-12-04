const alphabetOnly = '[A-Za-z]+';
const alphabetWithSpace = '[A-Za-z ]+';
const alphabetUpperCaseOnly = '[A-Z]+';
const alphabetLowerCaseOnly = '[a-z]+';
const numberOnly = '[0-9]+';
const username = '[a-z0-9_-]+';
const decimal = /^\d{1,6}(\.\d{1,2})?$/;
const phoneNumber = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
const shortDate = /^([0-9]{4}|[0-9]{2})[./-]([0]?[1-9]|[1][0-2])[./-]([0]?[1-9]|[1|2][0-9]|[3][0|1])$/g;

const Regex = {
  alphabetOnly,
  alphabetWithSpace,
  alphabetUpperCaseOnly,
  alphabetLowerCaseOnly,
  numberOnly,
  username,
  decimal,
  phoneNumber,
  shortDate
};

export default Regex;
