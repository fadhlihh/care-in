import SPACING from '../../theme/Spacing';

const CONST = {
  LOGO_SIZE: 64
};

module.exports = {
  photos: {
    height: 64,
    width: 64,
    aspectRatio: 1
  },

  text:{
    fontSize:18,
    color:'white'
  },

  img:{
    width:78,
    height:78,
    borderRadius:10
  },
  mapView: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
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
