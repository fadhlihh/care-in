import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Thumbnail, CardItem, Text } from 'native-base';
import styles from './styles';
import { StringBuilder } from '../../../../helpers';

const propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  distance: PropTypes.string.isRequired,
  photoSource: PropTypes.objectOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired
};

const defaultProps = {};

const CardWorker = (props) => {
  const { name, price, distance, photoSource, onPress } = props;

  return (
    <View style={styles.card}>
      <View noShadow style={styles.bundle}>
        <CardItem button style={styles.cardItem} onPress={onPress}>
          <Thumbnail source={photoSource} style={styles.img} />
          <View style={styles.subcard}>
            <Text style={styles.textSubcard}>{name}</Text>
            <Text style={styles.doneSubcard}>{distance}</Text>
            <Text style={styles.done2Subcard}>
              {`Rp. ${StringBuilder.formatCurrency(price)}`}
            </Text>
          </View>
        </CardItem>
      </View>
    </View>
  );
};

CardWorker.propTypes = propTypes;
CardWorker.defaultProps = defaultProps;

export default CardWorker;
