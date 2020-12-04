import SPACING from '../../../../theme/Spacing';

module.exports = {
  root: {},

  container: {
    height: '38%',
    paddingHorizontal: SPACING.PADDING_HORIZONTAL
  },

  editContainer: {
    height: '32%',
    paddingHorizontal: SPACING.PADDING_HORIZONTAL
  },

  deleteButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8
  },

  formInput: {
    marginBottom: 16
  },

  btnModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
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
  }
};
