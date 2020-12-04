import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import { Text,Left, Body, Icon, Thumbnail,Right, ListItem } from 'native-base';
import styles from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  item: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  warna: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'User'
};

const StyledHeader = (props) => {
  const { title,item,icon,warna, ...rest } = props;

  return (
    // <ListItem avatar>
    //   <Left style={{marginRight:'15%'}}>
    //     {/* <Thumbnail style={{width:30,height:30,marginVertical:5}} source={imageSource} /> */}
    //   </Left>
    //   <Body style={{marginLeft:'10%'}}>
    //     
    //   </Body>
    // </ListItem>
    <ListItem avatar>
      <Left>
    <Icon name={icon} style={{color:'red',marginTop:'50%',fontSize:19}}/>
      </Left>
      <Body style={{marginLeft:'7%'}}>
      <Text style={{color:'grey'}}>{title}</Text>
      <Text note style={{color:'black'}}>{item}</Text>
      </Body>
    </ListItem>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
