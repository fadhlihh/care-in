import SPACING from '../../theme/Spacing';

module.exports = {
  content: {},

  cardContainer: {
    flexDirection: 'column',
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },
  fab: {
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    backgroundColor: '#497CFB',
    zIndex: 0,
    elevation: 3
  },
  containt: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textContaint: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: '20%'
  },

  bottomsheet: { flex: 1 },
  bottomsheetDetail: {
    marginTop: 200
  },
  add: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  btnBundle: {
    flex: 1,
    flexDirection: 'column',
    justifyConten: 'flex-end',
    elevation: 3
  },
  button: {
    marginLeft: 'auto',
    borderRadius: 250,
    color: '#497CFB',
    elevation: 5
  },
  icon: {
    paddingLeft: '5%',
    color: 'white'
  },

  btnSuccessTextThree: {
    fontSize: 20,
    color: 'red'
  },
  btnSuccessDetailThree: {
    width: 50,
    height: 30,
    marginLeft: 4,
    borderRadius: 15,
    backgroundColor: '#EB5757',
    opacity: 0.2
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btnModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginTop: 20
  },
  btnModalKembali: {
    fontSize: 16,
    color: 'rgba(6, 44, 60, 0.4)'
  },
  btnModalSimpan: {
    backgroundColor: '#497CFB',
    borderRadius: 8,
    width: 94,
    height: 46
  },
  btntextModalSimpan: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    textAlign: 'center'
  },
  modal: {
    marginHorizontal: 15
  }
};
