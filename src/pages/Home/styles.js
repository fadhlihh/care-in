import SPACING from '../../theme/Spacing';

module.exports = {
  root:{
    marginHorizontal:16
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
    alignItems:'flex-start',
    marginLeft:10
  },
  chat:{
    backgroundColor:'#497CFB',
    borderRadius:8
  },
  chatText:{
    fontSize:15,
    paddingLeft:20,
    paddingRight:20,
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
