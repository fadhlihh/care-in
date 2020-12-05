import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CardItem, Text, Subtitle, Body } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

const defaultProps = {
  onPress: () => {}
};

const CardMedicalHistory = (props) => {
  const { name, date, onPress } = props;

  return (
    <View style={styles.card}>
    <View noShadow >
      <CardItem style={styles.bundle}>
        <View style={styles.subcardBundle}>
        <Text style={styles.penyakit}>{name}</Text>
        <Text style={styles.tanggal}>{date}</Text>
        </View>
      </CardItem>
    </View>
  </View>
  );
};

CardMedicalHistory.propTypes = propTypes;
CardMedicalHistory.defaultProps = defaultProps;

export default CardMedicalHistory;
