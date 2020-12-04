import { Regex } from '../../../../helpers';

module.exports = {
  nama: {
    presence: { allowEmpty: false },
    format: {
      pattern: Regex.alphabetWithSpace
    }
  },
  tempatLahir: {
    presence: { allowEmpty: false },
    format: {
      pattern: Regex.alphabetWithSpace
    }
  },
  tglLahir: {
    presence: { allowEmpty: false }
  }
};
