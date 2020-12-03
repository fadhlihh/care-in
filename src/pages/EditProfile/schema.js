import { Regex } from '../../helpers';

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
  },
  noTelp: {
    presence: { allowEmpty: false },
    format: {
      pattern: Regex.numberOnly
    },
    length: {
      maximum: 15
    }
  },
  email: {
    presence: { allowEmpty: false },
    email: {
      message: 'tidak sesuai kriteria'
    }
  }
};
