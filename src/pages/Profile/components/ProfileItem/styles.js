const { Directions } = require('react-native-gesture-handler');
const { Right } = require('native-base');

module.exports = {
  box:{
    overflow: 'hidden', 
    paddingBottom:  3,
    borderRadius:73,
  },
  boxWrapper:{
    backgroundColor: '#fff',
    width: 36,
    height: 36,
    borderRadius:73,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.4,
    shadowRadius: 1,
    elevation: 2,
  },
  stylesIcon:{
    color:'red',
    fontSize:25,
    marginVertical:5,
    marginHorizontal:5
  },
  body:{
    marginLeft:'5%'
  },
  text:{
    color:'grey',
    fontSize:12,
    color:' rgba(6, 44, 60, 0.4)'
  },
  textNote:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize:16
  }

};
