import SPACING from '../../theme/Spacing';

module.exports = {
  root: {
    marginHorizontal: 16
  },
  textSubHeading: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    fontWeight: 'bold'
  },
  textSubHeadingAll: {
    fontSize: 14,
    color: 'rgba(6, 44, 60, 0.9)'
  },
  subtitle: {
    flexDirection: 'row',
    marginTop: 22,
    marginBottom: '7%',
    justifyContent: 'space-between'
  },
  card:{
    overflow: 'hidden', 
    paddingBottom:  5,
    paddingRight:5,
    borderRadius:24,
  },
  bundle: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    width: 'auto',
    height: 106,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.7,
    shadowRadius: 1,
    elevation: 5,
    borderRadius: 24,
  },
  subcard: {
    marginHorizontal: 15,
    alignSelf: 'flex-start'
  },
  subcardBundle: {
    marginHorizontal: 13
  },
  textSubcard: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontWeight: 'bold',
    fontSize: 18
  },
  subtextSubcard: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 12
  },
  doneSubcard: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    paddingLeft: '-5%',
    paddingTop:5
  },
  doneSubcardTwo: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    paddingLeft: '-5%',
    fontWeight:'bold',
    paddingTop:8
  },
  done: {
    color: '#27AE60',
    fontSize: 14,
    fontWeight: '600'
  },
  failed: {
    color: '#EB5757',
    fontSize: 14,
    fontWeight: '600'
  },
  img: {
    width: 78,
    height: 78,
    borderRadius: 10
  },

  noTransSubcard: {
    textAlign: 'center',
    marginHorizontal: '12%',
    color: 'grey',
    fontSize: 18,
    alignSelf: 'center'
  },

  textBundle: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center'
  },
  chat:{
    backgroundColor:'#497CFB',
    borderRadius:8,
    height:35,
    width:66, 
    marginBottom:'-90%',
    alignSelf:'flex-end',
    paddingLeft:4,
  },
  chatBatalkan:{
    backgroundColor:'#EB5757',
    opacity:0.2,
    borderRadius:8,
    height:35,
    width:96, 
    marginTop:5,
    marginBottom:'-90%',
    alignSelf:'flex-end',
    paddingLeft:4,

  },
  chatTextBatalkan: {
    fontSize: 14,
    paddingTop: '5%',
    paddingBottom: '5%',
    color: 'red',
    textAlign: 'center'
  },
  chatBundleBatalkan: {
    alignSelf: 'center',
    marginRight: '-5%',
    marginTop:5
  },
  chatBundle: {
    alignSelf: 'center',
    marginRight: '-5%',
    marginTop:5
  },
  chatText: {
    fontSize: 14,
    paddingTop: '5%',
    paddingBottom: '5%',
    color: 'white',
    textAlign: 'center'
  },

  chatTextBundle:{
    flex:1,flexDirection:'row',
    alignSelf:'center',
  },


  feature:{
    marginTop:30
  },
  content: {
    backgroundColor: 'green'
  },

  cardContainer: {
    marginTop: '5%',
    height: '75%',
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },

  secondBundle:{
    marginHorizontal:16,
    marginVertical:16
  },
  infoSubCardOne:{
    color: 'rgba(6, 44, 60, 0.9)', 
    fontSize: 12
  },
  subCardOne: {
    marginLeft: '-20%'
  },
  nameSubCardOne: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontWeight: 'bold',
    fontSize: 18
  }, btnSuccessDetailThree: {
    width: 72,
    height: 32,
    marginLeft: 4,
    borderRadius: 8
  },
  btnCancelDetailThree: {
    backgroundColor: '#EB5757',
    opacity: 0.2,
    width: 72,
    height: 32,
    borderRadius: 8
  },
  btnCancelTextThree: {
    fontSize: 10,
    color: 'red',
    textAlign: 'center'
  },
  btnSuccessTextThree: {
    fontSize: 10,
    color: 'white'
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
};
