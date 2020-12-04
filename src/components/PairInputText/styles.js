import Color from 'color';

const styles = {
  input: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 12,
    paddingRight: 12
  },

  tahunInput: {
    flex: 2,
    paddingRight: 16
  },

  penyakitInput: {
    flex: 4
  },

  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },

  buttonAdd: {
    aspectRatio: 1 / 1,
    backgroundColor: Color('#27AE60').alpha(0.2).string(),
    paddingLeft: -20,
    elevation: 0,
    marginLeft: 8
  },

  iconAdd: {
    marginLeft: 10,
    color: '#27AE60'
  },

  buttonDelete: {
    aspectRatio: 1 / 1,
    backgroundColor: Color('#EB5757').alpha(0.2).string(),
    paddingLeft: -20,
    elevation: 0
  },

  iconDelete: {
    marginLeft: 10,
    color: '#EB5757'
  }
};

export default styles;
