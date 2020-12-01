import { Regex } from '../../helpers';

module.exports = {
  beratBadan: {
    presence: { allowEmpty: false },
    format: {
      pattern: Regex.decimal
    }
  },
  tinggiBadan: {
    presence: { allowEmpty: false },
    format: {
      pattern: Regex.decimal
    },
    numericality: { notGreaterThan: 1000 }
  },
  goldar: {
    presence: { allowEmpty: false },
    format: {
      pattern: Regex.alphabetLowerCaseOnly
    },
    length: {
      maximum: 2
    }
  }
};
