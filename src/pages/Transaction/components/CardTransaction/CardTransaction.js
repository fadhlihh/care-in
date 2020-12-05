import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Thumbnail, CardItem, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  status: PropTypes.bool,
  photoSource: PropTypes.objectOf(PropTypes.string),
  cost: PropTypes.number,
  worker: PropTypes.bool,
  onPress: PropTypes.func
};

const defaultProps = {
  date: '',
  status: false,
  cost: 0,
  photoSource: {},
  worker: false,
  onPress: () => {}
};

const CardTransaction = (props) => {
  const { name, photoSource, status, date, worker, cost, onPress } = props;

  return (
    <View style={styles.card}>
      <View noShadow>
        <CardItem style={styles.bundle}>
          {worker && <Thumbnail source={photoSource} style={styles.img} />}
          <View style={styles.subcard}>
            <Text style={styles.textSubcard}>{name}</Text>
            <Text style={styles.doneSubcard}>{date}</Text>
            <Text style={styles.doneSubcardCost}>
              {`Rp. ${cost} • `}
              <Text style={status ? styles.done : styles.failed}>
                {status ? 'Selesai' : 'Gagal'}
              </Text>
            </Text>
          </View>
        </CardItem>
      </View>
    </View>
  );
};

CardTransaction.propTypes = propTypes;
CardTransaction.defaultProps = defaultProps;

export default CardTransaction;
