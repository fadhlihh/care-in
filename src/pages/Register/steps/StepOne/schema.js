import { Regex } from '../../../../helpers';

module.exports = {
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
  },
  username: {
    presence: { allowEmpty: false },
    format: {
      pattern: Regex.username
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
