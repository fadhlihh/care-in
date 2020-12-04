import SPACING from '../../theme/Spacing';

module.exports = {
  content: {},

  cardContainer: {
    flexDirection: 'column',
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },
  nothingDefault:{
    flex:1,
    flexDirection:'column',
    marginVertical:'90%',
    alignItems:'center'
  },
  textNothingDefault:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize:16,
    textAlign:'center'
  },
  img:{
    width:78,
    height:78,
    borderRadius:10
  },
  card:{
    borderRadius:24,
    elevation:4
  },
  subcard:{
    marginLeft:13
  },
  textSubcard:{
    color: 'rgba(6, 44, 60, 0.9)', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  doneSubcard:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
  },
  done2Subcard:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    fontWeight:'600'
  },

  //dont delete this
  root:{
    marginHorizontal:16,
  },
  cardProfil:{
    marginVertical:26,
    flexDirection:'row',
    marginHorizontal:5,
  },
  subCardProfil:{
    marginVertical:'4%',
    marginLeft:13
  },
  textProfil:{
    color: 'rgba(6, 44, 60, 0.9)', 
    fontWeight: 'bold', 
    fontSize: 18 ,
  },
  doneProfil:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    marginTop:7
  },
  textSubHeading:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    fontWeight:'bold',
    marginBottom:8
  },
  detailCheckOut:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:6
  },
  titleCheckOut:{
    fontSize:12,
    color: 'rgba(6, 44, 60, 0.9)',
  },
  totalCheckOut:{
    fontSize:12,
    fontWeight:'bold',
    color: 'rgba(6, 44, 60, 0.9)',
    marginTop:6
  },
  button_save:{
    borderRadius:16,
    backgroundColor:'#497CFB',
    marginVertical:26,
    height:60
  }
};
