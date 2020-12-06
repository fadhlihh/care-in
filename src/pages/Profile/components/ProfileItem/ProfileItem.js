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
const getColor = (warna) => {
  switch(warna){
    case 'blue' : return ('#497CFB');
    case 'red' : return ('red');
    case 'orange' : return ('orange');
    case 'green' : return ('green');
  }
}
const StyledHeader = (props) => {
  const { title,item,icon,warna, ...rest } = props;

  return (
    <ListItem noBorder avatar >
      <View style={styles.box}>
        <View style={styles.boxWrapper}>
        <Icon name={icon} style={{color:getColor(warna),fontSize:25,marginVertical:5,marginHorizontal:5}}/>
        </View>
      </View>
      <Body style={styles.body}>
      <Text style={styles.text}>{title}</Text>
      <Text note style={styles.textNote}>{item}</Text>
      </Body>
    </ListItem>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
