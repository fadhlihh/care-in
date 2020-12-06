import SPACING from '../../theme/Spacing';

const PROFILE_PICTURE_SIZE = 40;

module.exports = {
  content: {
    backgroundColor: 'green'
  },
  cardOne:{
    marginHorizontal:40
  },
  subCardOne: {
    marginLeft: '-20%'
  },
  nameSubCardOne: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontWeight: 'bold',
    fontSize: 18
  },
  statusSubCardOne: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 12
  },
  btnSubCardOne: {
    marginTop: 5,
  },
  btnCancelDetailOne: {
    backgroundColor: '#EB5757',
    opacity: 0.2,
    width: 85,
    height: 32,
    borderRadius: 8
  },
  btnCancelTextOne: {
    fontSize: 10,
    color: 'red'
  },
  btnSuccessDetailOne: {
    backgroundColor: '#27AE60',
    opacity: 0.3,
    width: 75,
    height: 32,
    marginLeft: 4,
    borderRadius: 8
  },
  btnSuccessTextOne: {
    fontSize: 10,
    color: 'green'
  },

  heading: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: '7%',
    justifyContent: 'space-between'
  },
  thumbnail: {
    borderRadius: PROFILE_PICTURE_SIZE,
    width: PROFILE_PICTURE_SIZE,
    height: PROFILE_PICTURE_SIZE,
    aspectRatio: 1 / 1,
    backgroundColor: 'white',
    borderColor: '#497CFB',
    borderWidth: 2
  },
  infoMoney: {
    flexDirection: 'row',
    marginHorizontal: 36,
    marginBottom: '7%',
    justifyContent: 'space-between'
  },
  infoMoneyHeader: {
    fontSize: 12,
    color: 'rgba(6, 44, 60, 0.9)'
  },
  infoMoneyTotal: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'rgba(6, 44, 60, 0.9)'
  },
  map: {
    width: '100%',
    aspectRatio: 1
  },
  subHeadingLeft: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'rgba(6, 44, 60, 0.9)'
  },
  subHeadingRight: {
    fontSize: 14,
    color: 'rgba(6, 44, 60, 0.9)'
  },
  subCardOne: {
  },
  nameSubCardOne: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontWeight: 'bold',
    fontSize: 18, 
  },
  statusSubCardOne: {
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 12
  },
  btnSubCardOne: {
    flexDirection: 'row',
    marginTop: 5
  },
  btnCancelDetailOne: {
    backgroundColor: '#EB5757',
    opacity: 0.2,
    width: 72,
    height: 32,
    borderRadius: 8
  },
  btnCancelTextOne: {
    fontSize: 10,
    color: 'red',
    textAlign:'center',
    flex:1,
    paddingLeft:'-2%',
    paddingRight:'-2%',
  },
  btnSuccessDetailOne: {
    backgroundColor: '#27AE60',
    opacity: 0.3,
    width: 75,
    height: 32,
    marginLeft: 4,
    borderRadius: 8
  },
  btnSuccessTextOne: {
    fontSize: 10,
    color: 'green',
    flex:1,
    textAlign:'center',
    paddingLeft:'-2%',
    paddingRight:'-2%',
  },
  btnSuccessDetailThree: {
    width: 72,
    height: 32,
    marginLeft: 4,
    borderRadius: 8,
  },
  btnCancelDetailThree: {
    backgroundColor: '#EB5757',
    opacity: 0.2,
    width: 72,
    height: 32,
    borderRadius: 8,
  },
  
  chatTextBundle:{
    flex:1,flexDirection:'row',
    alignSelf:'center',
  },
  
  btnCancelTextThree: {
    fontSize: 10,
    color: 'red',
    textAlign:'center',
    flex:1,
    paddingLeft:'-2%',
    paddingRight:'-2%',
  },
  btnSuccessTextThree: {
    fontSize: 10,
    textAlign:'center',
    flex:1,
    paddingLeft:'-2%',
    paddingRight:'-2%',
  },
  cardContainer: {
    marginTop: '5%',
    height: '75%',
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  },

  subtitle: {
    flexDirection: 'row',
    marginTop: 13,
    marginBottom: 8,
    justifyContent: 'space-between'
  },
  chatSubCardOne: {
    backgroundColor: '#497CFB',
    width: 79,
    height: 32,
    marginTop: 45,
    borderRadius: 8,
    
  },
  chatTextSubCardOne: {
    fontSize: 10,
    color: 'white',
    flex:1,
    textAlign:'center',
    paddingLeft:'-2%',
    paddingRight:'-2%',
  },
  card:{
    overflow: 'hidden', 
    paddingBottom:  5,
    paddingRight:5,
    borderRadius:24,
  },
  bundle:{
    backgroundColor: '#fff',
    shadowColor: '#000',
    width:'auto',
    height:106,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity:  0.7,
    shadowRadius: 1,
    elevation: 5,
    borderRadius:24
  },
  secondBundle:{
    marginHorizontal:16,
    marginVertical:16
  },
  infoSubCardOne:{
    color: 'rgba(6, 44, 60, 0.9)', 
    fontSize: 12
  },
  subcard: {},
  cardBundle: {
    marginVertical: 14,
    marginHorizontal: 20
  },
  noInfoCard: {
    borderRadius: 24,
    height: 106,
    backgroundColor: '#497CFB'
  },
  noInfoCardOFF: {
    borderRadius: 24,
    height: 106,
    backgroundColor: '#497CFB',
    opacity: 0.6
  },
  noInfoCardBundle: {
    marginVertical: 30,
    marginHorizontal: 20
  },
  noInfoTextCard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  switchCard: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textCard: {
    fontSize: 14,
    color: 'white',
    paddingTop: 3
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btnTrash: {
    backgroundColor: '#EB5757',
    opacity: 0.2,
    marginRight: 9
  },
  iconTrash: {
    color: '#EB5757'
  },
  btnAdd: {
    backgroundColor: '#27AE60',
    opacity: 0.2
  },
  iconAdd: {
    color: '#27AE60'
  },
  cek: {
    color: 'red'
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
  chatBundle: {
    alignSelf: 'center',
    marginRight: '-13%',
  },
};
