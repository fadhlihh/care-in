import SPACING from '../../theme/Spacing';

module.exports = {
  content: {},

  cardContainer: {
    flexDirection: 'column',
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },
  fab:{
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    backgroundColor:'#497CFB',
  },
  containt:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  textContaint:{
    fontSize:40,
    color:'white',
    textAlign:'center',
    fontWeight:'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop:'20%'
  },
};
