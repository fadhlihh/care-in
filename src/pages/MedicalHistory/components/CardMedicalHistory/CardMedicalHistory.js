import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};

const defaultProps = {};

const CardMedicalHistory = (props) => {
  const { name, date } = props;

  return (
    <Card style={styles.root}>
      <CardItem button style={styles.content}>
        <View style={styles.information}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </CardItem>
    </Card>
  );
};

CardMedicalHistory.propTypes = propTypes;
CardMedicalHistory.defaultProps = defaultProps;

export default CardMedicalHistory;
