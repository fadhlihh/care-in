import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Thumbnail, Title } from 'native-base';
import styles from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  imageSource: PropTypes.objectOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string
};

const defaultProps = {
  color: '#FFFFFF'
};

const Feature = (props) => {
  const { title, imageSource, onPress, color } = props;

  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <View style={styles.stack_one}>
        <Title
          style={styles.title
          }
        >
          {title}
        </Title>
      </View>
      <View style={styles.stack_two}>
        <Thumbnail source={imageSource} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
};

Feature.propTypes = propTypes;
Feature.defaultProps = defaultProps;

export default Feature;
