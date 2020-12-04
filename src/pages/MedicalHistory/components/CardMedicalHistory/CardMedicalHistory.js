import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CardItem, Title, Subtitle, Body } from 'native-base';
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
    <CardItem button onPress={onPress} style={styles.root}>
      <Body>
        <View style={styles.bubble}>
          <Title style={{ color: 'black', fontSize: 16, fontWeight: '700' }}>
            {name}
          </Title>
          <Subtitle style={{ color: 'black', fontSize: 12 }}>{date}</Subtitle>
        </View>
      </Body>
    </CardItem>
  );
};

CardMedicalHistory.propTypes = propTypes;
CardMedicalHistory.defaultProps = defaultProps;

export default CardMedicalHistory;
