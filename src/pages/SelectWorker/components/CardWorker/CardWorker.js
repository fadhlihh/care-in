import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  distance: PropTypes.number.isRequired,
  photoSource: PropTypes.objectOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired
};

const defaultProps = {};

const StyledHeader = (props) => {
  const { name, price, distance, photoSource, onPress } = props;

  return (
    <Card style={styles.root}>
      <CardItem button style={styles.content} onPress={onPress}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={photoSource} />
        </View>
        <View style={styles.information}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.distance}>{distance}</Text>
        </View>
      </CardItem>
    </Card>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
