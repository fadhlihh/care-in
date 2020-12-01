import { REGEX } from '../../util';

module.exports = {
  beratBadan: {
    presence: { allowEmpty: false },
    format: {
      pattern: REGEX.decimal
    }
  },
  tinggiBadan: {
    presence: { allowEmpty: false },
    format: {
      pattern: REGEX.decimal
    },
    numericality: { notGreaterThan: 1000 }
  },
  goldar: {
    presence: { allowEmpty: false },
    format: {
      pattern: REGEX.alphabetLowerCaseOnly
    },
    length: {
      maximum: 2
    }
  }
};
