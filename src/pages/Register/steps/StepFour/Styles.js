import SPACING from '../../../../theme/Spacing';

module.exports = {
  container: {
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },
  textHeading: {
    fontSize: 28,
    color: 'rgba(6, 44, 60, 0.9)',
    marginHorizontal: 15,
    fontWeight: 'bold',
    marginBottom: 35
  },
  loginForm: {
    marginVertical: '25%'
  },
  button: {
    marginLeft: 'auto',
    borderRadius: 200,
    color: '#497CFB',
    elevation: 5
  },
  icon: {
    paddingHorizontal: 5,
    paddingLeft: '5%',
    color: 'white'
  },
  input: {
    flex: 1,
    flexDirection: 'row'
  },
  tahunInput: {
    width: 100
  },
  penyakitInput: {
    width: 240
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 85
  },
  btnTrash: {
    backgroundColor: '#EB5757',
    opacity: 0.2,
    marginRight: 9
  },
  iconTrash: {
    color: '#EB5757'
  },
  btnAdd: {
    backgroundColor: '#27AE60',
    opacity: 0.2
  },
  iconAdd: {
    color: '#27AE60'
  },
  btnBundle: {
    flex: 1,
    flexDirection: 'column',
    justifyConten: 'flex-end',
    elevation: 3
  }
};
