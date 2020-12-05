const { Directions } = require("react-native-gesture-handler");
const { Right } = require("native-base");

module.exports = {
  root: {
    backgroundColor:'white',
    borderRadius:50,
    elevation:2,
  },
  bubble:{
    marginLeft:'10%',
    marginVertical:11,
    elevation:3
  },
  card:{
    overflow: 'hidden', 
    paddingBottom:  5,
    paddingRight:5,
    borderRadius:54,
    marginHorizontal:16,
    marginTop:9
  },
  bundle:{
    backgroundColor: '#fff',
    shadowColor: '#000',
    width:'auto',
    height:70,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.9,
    shadowRadius: 1,
    elevation: 2,
    borderRadius:54
  },
  subcard:{
    marginHorizontal:15,
    alignSelf:'flex-start'
  },
  subcardBundle:{
    marginHorizontal:13
  },
  penyakit:{
    ontSize:16,
    fontWeight:'bold',
    color:'rgba(6, 44, 60, 0.9)'
  },
  tanggal:{
    fontSize:12,
    color:'rgba(6, 44, 60, 0.9)'
  }
};
