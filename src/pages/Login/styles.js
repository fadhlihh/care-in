import SPACING from '../../theme/Spacing';

const CONST = {
  LOGO_SIZE: 128
};

module.exports = {
  headerContainer: {
    position: 'relative',
    backgroundColor: '#a22a5f',
    height: '25%'
  },

  logo: {
    backgroundColor: '#a22a5f',
    position: 'absolute',
    left: '50%',
    marginLeft: -CONST.LOGO_SIZE / 2,
    bottom: -CONST.LOGO_SIZE / 2,
    width: CONST.LOGO_SIZE,
    height: CONST.LOGO_SIZE
  },

  formContainer: {
    height: '75%',
    paddingTop: CONST.LOGO_SIZE / 2 + 20,
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },

  loginForm: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  separator: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  registerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
};
