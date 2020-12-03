import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  worker: PropTypes.bool
};

const defaultProps = {
  worker: false
};

const BubbleChat = (props) => {
  const { message, time, worker } = props;

  return (
    <Card style={styles.root}>
      <CardItem button style={styles.content}>
        <View style={styles.information}>
          <Text style={styles.name}>{message}</Text>
          <Text style={styles.name}>{time}</Text>
        </View>
      </CardItem>
    </Card>
  );
};

BubbleChat.propTypes = propTypes;
BubbleChat.defaultProps = defaultProps;

export default BubbleChat;
