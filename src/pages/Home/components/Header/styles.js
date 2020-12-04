const { Directions } = require("react-native-gesture-handler");
const { Right } = require("native-base");

module.exports = {
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
    marginVertical:'35%',
  },
  text:{
    color:'white',
    fontSize:24,
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
