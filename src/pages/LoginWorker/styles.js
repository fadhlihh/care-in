import SPACING from '../../theme/Spacing';

const CONST = {
  LOGO_SIZE: 128
};

module.exports = {
  headerContainer: {
    position: 'relative',
    backgroundColor: '#a22a5f',
    height: '25%'
  },

  logoContainer:{
    justifyContent:'center',
    alignItems: 'center',
  },

  logoheader: {
    // backgroundColor: '#a22a5f',
    // position: 'absolute',
    // left: '50%',
    // marginLeft: -CONST.LOGO_SIZE / 2,
    // bottom: -CONST.LOGO_SIZE / 2,
    // width: CONST.LOGO_SIZE,
    // height: CONST.LOGO_SIZE
    marginTop:'15%',
    width:150,
    height:150
  },

  textheader:{
    fontSize:24,
    fontWeight:'bold',
    marginTop:20,
    marginBottom:10
  },

  formContainer: {
    marginTop:'80%',
    height: '45%',
    // paddingTop: CONST.LOGO_SIZE / 2 ,
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },

  loginForm: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

  separator: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  textseparator:{
    color:'grey'
  },

  text:{
    fontSize:18,
    color:'white'
  },

  registerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  
  button_save:{
    borderRadius:20,
    marginHorizontal:'7%',
    marginTop:'10%',
    backgroundColor:'#497CFB'
  }
};
