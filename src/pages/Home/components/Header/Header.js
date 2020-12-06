import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
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

const win = Dimensions.get('window');
const ratio = win.width / 360;

const StyledHeader = (props) => {
  const { name, ...rest } = props;

  return (
    <View noShadow {...rest}>
      <ImageBackground
        style={{ width: win.width, height: 301 * ratio }}
        source={require('../../../../assets/images/WavyBackground.png')}
      />
      <View style={styles.textBundle}>
        <Text style={styles.text}>{`Halo ${name}`}</Text>
        <Text style={styles.welcomeText}>{`Kami siap datang \nmembantu!`}</Text>
      </View>

      <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
        <Button transparent onPress={() => Actions.profile()}>
          <Icon
            name="person-circle-outline"
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
