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
    height: '55%',
    // paddingTop: CONST.LOGO_SIZE / 2 ,
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },

  loginForm: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  separator: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  text:{
    fontSize:18,
    color:'white'
  },

  textseparator:{
    color:'grey'
  },

  registerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  
  button_save:{
    borderRadius:16,
    backgroundColor:'#497CFB',
    marginVertical:26,
    height:60
  },

  preRegister:{
    fontSize:16,
    fontWeight:'300',
    color: 'rgba(6, 44, 60, 0.5)'
  },

  register:{
    fontSize:16,
    fontWeight:'bold',
    color: 'rgba(6, 44, 60, 0.9)'
  }
};
