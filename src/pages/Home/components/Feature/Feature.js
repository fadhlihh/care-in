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

const getColor = (color) => {
  switch(color){
    case 'blue' : return ('#497CFB')
    case 'red'  : return ('#F47F72')
    case 'orange'  : return ('#FFB167')
  }
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
      <View style={{
        backgroundColor:getColor(color),
        position: 'absolute',
        marginLeft: '30%',
        width: 70,
        height: 70,
        borderRadius: 10,
        zIndex: 1,
        elevation: 6
        }}>
        <Thumbnail source={imageSource} style={styles.img} />
      </View>
    </TouchableOpacity>
  );
};

Feature.propTypes = propTypes;
Feature.defaultProps = defaultProps;

export default Feature;
