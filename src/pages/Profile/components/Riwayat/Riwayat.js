import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import { Text,CardItem, Body, Title,Subtitle } from 'native-base';
import styles from './styles';

const propTypes = {
  penyakit: PropTypes.string.isRequired,
  tanggal: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'User'
};

const StyledHeader = (props) => {
  const { penyakit,tanggal, ...rest } = props;

  return (
    <CardItem>
      <Body style={styles.root}>
        <View style={styles.bubble}>
        <Text style={{color:'black',fontSize:16}}>{penyakit}</Text>
        <Text style={{color:'black',fontSize:12}}>{tanggal}</Text>
        </View>
      </Body>
    </CardItem>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
