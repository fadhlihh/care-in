import SPACING from '../../theme/Spacing';

module.exports = {
  root:{
    marginHorizontal:16
  },
  textSubHeading:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    fontWeight:'bold'
  },
  subtitle:{
    flexDirection: 'row',
    marginTop:40,
    marginBottom:'7%', 
    justifyContent: 'space-between'
  },
  img:{
    width:78,
    height:78,
    borderRadius:10
  },
  card:{
    borderRadius:24
  },
  subcard:{
    marginLeft:13
  },
  textSubcard:{
    color: 'rgba(6, 44, 60, 0.9)', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
  subtextSubcard:{
    color: 'rgba(6, 44, 60, 0.9)', 
    fontSize: 12 
  },
  doneSubcard:{
    color: 'rgba(6, 44, 60, 0.9)',
    fontSize: 14,
    paddingLeft:'-5%'
  },
  doneInfoSubcard:{
    color: 'green',
    fontSize: 14,
    fontWeight: '600'
  },
  noTransSubcard:{
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: '12%',
    color: 'grey',
    fontSize: 18
  },
  chat:{
    backgroundColor:'#497CFB',
    borderRadius:8,
    height:35,
    width:58,
  },
  chatText:{
    fontSize:14,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:'5%',
    paddingBottom:'5%', 
    color:'white' 
  },
  feature:{
    marginTop:30
  },
  content: {
    backgroundColor: 'green'
  },

  cardContainer: {
    marginTop:'5%',
    height: '75%',
    paddingLeft: SPACING.PADDING_HORIZONTAL,
    paddingRight: SPACING.PADDING_HORIZONTAL
  }
};
