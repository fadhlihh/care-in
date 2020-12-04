import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import { Thumbnail, Title} from 'native-base';
import styles from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  imageSource: PropTypes.objectOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired,
  reverse: PropTypes.bool
};

const defaultProps = {
  reverse: false
};

const StyledHeader = (props) => {
  const { title, reverse, imageSource, onPress } = props;

  return (
    <View style={styles.root}>
        <View style={styles.stack_one}>
            <Title style={{paddingTop:'70%',textAlign:'center'}}>{title}</Title>
        </View>
        <View style={styles.stack_two}>
        <Thumbnail source={imageSource} style={styles.img}/>
        </View>
    </View>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;



