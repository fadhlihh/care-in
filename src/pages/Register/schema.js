import { REGEX } from '../../util';

module.exports = {
  nama: {
    presence: { allowEmpty: false },
    format: {
      pattern: REGEX.alphabetWithSpace
    }
  },
  tempatLahir: {
    presence: { allowEmpty: false },
    format: {
      pattern: REGEX.alphabetWithSpace
    }
  },
  tglLahir: {
    presence: { allowEmpty: false }
  },
  noTelp: {
    presence: { allowEmpty: false },
    format: {
      pattern: REGEX.numberOnly
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
  },
  username: {
    presence: { allowEmpty: false },
    format: {
      pattern: REGEX.username
    },
    length: {
      minimum: 3,
      maximum: 16
    }
  },
  password: {
    presence: { allowEmpty: false },
    length: {
      minimum: 8,
      tooShort: 'minimal 8 karakter',
      maximum: 128,
      tooLong: 'maximal 128 karakter'
    }
  },
  confirmPassword: {
    equality: { attribute: 'password' },
    presence: { allowEmpty: false }
  }
};
