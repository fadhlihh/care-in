const alphabetOnly = '[A-Za-z]+';
const alphabetWithSpace = '[A-Za-z ]+';
const alphabetUpperCaseOnly = '[A-Z]+';
const alphabetLowerCaseOnly = '[a-z]+';
const numberOnly = '[0-9]+';
const username = '[a-z0-9_-]+';
const decimal = /^\d{1,6}(\.\d{1,2})?$/;

const REGEX = {
  alphabetOnly,
  alphabetWithSpace,
  alphabetUpperCaseOnly,
  alphabetLowerCaseOnly,
  numberOnly,
  username,
  decimal
};

export default REGEX;
