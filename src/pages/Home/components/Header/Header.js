import React from 'react';
import { View, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const propTypes = {
  name: PropTypes.string
};

const defaultProps = {
  name: 'User'
};

const StyledHeader = (props) => {
  const { name, ...rest } = props;

  return (
    <View
      style={{ flex: 1, flexDirection: 'column', position: 'relative' }}
      noShadow
      {...rest}
    >
      <ImageBackground
        style={styles.background}
        source={require('../../../../assets/WavyBackground.png')}
      />
      <View style={styles.textBundle}>
        <Text style={styles.text}>{`Halo ${name}`}</Text>
        <Text style={styles.welcomeText}>Kami siap datang membantu!</Text>
      </View>
      <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
        <Button transparent onPress={() => Actions.profile()}>
          <Icon
            name="person-circle-outline"
            style={{ color: 'white', fontSize: 36 }}
          />
        </Button>
      </View>
    </View>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
