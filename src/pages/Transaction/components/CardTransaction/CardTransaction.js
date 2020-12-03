import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Button, Card, CardItem, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  status: PropTypes.string,
  photoSource: PropTypes.objectOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired
};

const defaultProps = {
  date: '',
  status: 'off'
};

const CardTransaction = (props) => {
  const { name, date, photoSource, onPress, status } = props;

  const getSubInfo = () => {
    switch (status) {
      case 'pending':
        return 'Sedang menunggu konfirmasi';
      case 'berjalan':
        return 'Tenaga kesehatan akan datang';
      default:
        return date;
    }
  };

  return (
    <Card style={styles.root}>
      <CardItem button style={styles.content}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={photoSource} />
        </View>
        <View style={styles.information}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subinfo}>{getSubInfo()}</Text>
        </View>
        {status !== 'off' && (
          <Button onPress={onPress}>
            <Text>Chat</Text>
          </Button>
        )}
      </CardItem>
    </Card>
  );
};

CardTransaction.propTypes = propTypes;
CardTransaction.defaultProps = defaultProps;

export default CardTransaction;
