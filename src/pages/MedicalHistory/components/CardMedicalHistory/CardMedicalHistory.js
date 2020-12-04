import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { CardItem, Title, Subtitle,Left, Thumbnail, Body, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

const defaultProps = {};

const CardMedicalHistory = (props) => {
  const { name, date } = props;

  return (
    <CardItem>
      <Body style={styles.root}>
        <View style={styles.bubble}>
        <Title style={{color:'black',fontSize:16,fontWeight:'700'}}>{name}</Title>
        <Subtitle style={{color:'black',fontSize:12}}>{date}</Subtitle>
        </View>
      </Body>
    </CardItem>
  );
};

CardMedicalHistory.propTypes = propTypes;
CardMedicalHistory.defaultProps = defaultProps;

export default CardMedicalHistory;
