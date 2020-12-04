import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Card, CardItem, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  label: PropTypes.string.isRequired,
  imageSource: PropTypes.objectOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired,
  reverse: PropTypes.bool
};

const defaultProps = {
  reverse: false
};

const StyledHeader = (props) => {
  const { label, reverse, imageSource, onPress } = props;

  return (
    <Card style={styles.root}>
      <CardItem button style={styles.content} onPress={onPress}>
        {reverse && <Text style={styles.label}>{label}</Text>}
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={imageSource} />
        </View>
        {!reverse && <Text style={styles.label}>{label}</Text>}
      </CardItem>
    </Card>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
