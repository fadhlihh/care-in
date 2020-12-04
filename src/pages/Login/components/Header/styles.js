const { Directions } = require("react-native-gesture-handler");
const { Right } = require("native-base");

module.exports = {
  root: {
    marginVertical:'20%',
    backgroundColor: '#00A3FF',
  },
  sub_header:{
    marginTop: '-10%',
    position: 'relative',
  },
  image: {
    width:100,
    height:100,
    borderRadius:100,
    alignItems:'center',
    marginHorizontal :'35%'
  },
  text:{
    color:'white',
    fontSize:24,
    textAlign:"center",
    marginTop:10,
    fontWeight:'bold',
  },
  sub_text:{
    color:'white',
    fontSize:18,
    textAlign:"center",
  },

  root: {
    marginVertical:'30%',
    flex: 1,
    flexDirection: "column"
  },
  image: {
    width:250,
    height:290,
  },
  textBundle:{
    marginHorizontal:36,
    position:'absolute',
    marginVertical:'15%',
    alignSelf: 'center',
  },
  welcomeText:{
    color:'white',
    fontSize:28,
    fontWeight:'bold',
    paddingRight:'20%'
  },
  background:{
    width:'auto',
    height:330,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
};
