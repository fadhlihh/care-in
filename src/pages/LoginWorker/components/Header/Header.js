import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
import {
  Header,
  Button,
  Text,
  Left,
  Icon,
  Right,
  Title,
  Subtitle,
  Thumbnail
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string
};

const defaultProps = {
  name: 'User'
};

const StyledHeader = (props) => {
  const { name, username, ...rest } = props;

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
        <Icon
          name="medkit-outline"
          style={{ color: 'white', textAlign: 'center', fontSize: 100 }}
        />
        <Text style={styles.text}>{`Masuk Sebagai\n Tenaga Kesehatan`}</Text>
      </View>
      <View style={{ position: 'absolute', alignSelf: 'flex-end' }}>
        {/* <Button transparent  onPress={() => Actions.loginWorker()}>
            <Icon name='medkit-outline' style={{color:'white',fontSize:36}}/>
          </Button> */}
      </View>
    </View>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
