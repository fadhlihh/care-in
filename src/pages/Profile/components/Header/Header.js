import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Text, Icon } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  onEditPress: PropTypes.func.isRequired,
  onBackPress: PropTypes.func.isRequired,
  pictureSource: PropTypes.objectOf(PropTypes.string)
};

const defaultProps = {
  pictureSource: {
    uri:
      'https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg'
  }
};

const StyledHeader = (props) => {
  const {
    name,
    username,
    onEditPress,
    onBackPress,
    pictureSource,
    ...rest
  } = props;

  return (
    <View
      style={{ flex: 1, flexDirection: 'column', position: 'relative' }}
      noShadow
      {...rest}
    >
      <ImageBackground
        style={styles.background}
        source={require('../../../../assets/images/WavyBackground.png')}
      />
      <View style={styles.textBundle}>
        <View style={styles.imageBundle}>
          <Image style={styles.img} large source={pictureSource} />
        </View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.sub_text}>{username}</Text>
      </View>
      <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
        <Button transparent onPress={onEditPress}>
          <Icon
            name="create-outline"
            style={{ color: 'white', fontSize: 30 }}
          />
        </Button>
      </View>
      <View style={{ position: 'absolute', alignSelf: 'flex-start' }}>
        <Button transparent onPress={onBackPress}>
          <Icon
            name="chevron-back-outline"
            style={{ color: 'white', fontSize: 30 }}
          />
        </Button>
      </View>
    </View>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
