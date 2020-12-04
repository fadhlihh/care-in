import React from 'react';
import {View,Image, ImageBackground} from 'react-native';
import PropTypes from 'prop-types';
import { Header,Button, Text,Left,Icon, Right, Title, Subtitle, Thumbnail } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
};

const defaultProps = {
  name: 'User'
};

const StyledHeader = (props) => {
  const { name,username, ...rest } = props;
  const handleSubmit = () => {
    API.postGenerateToken(formState.values)
      .then(
        (res) => {
          setToken(res.token);
          LocalStorage.storeToken(res.token);
          Toast.show({ text: res.message }, 1000);
          setTimeout(() => Actions.home(), 1000);
        },
        (error) => {
          Toast.show({ text: error.response.data.message }, 3000);
        }
      )
      .catch((error) => {
        Toast.show(
          { text: `Something went wrong:  ${error.response.data.message}` },
          3000
        );
      });
  };
  return (
    <View style={{flex:1,flexDirection:'column',position:'relative'}} noShadow {...rest}> 
      <ImageBackground style={styles.background} source={require('../../../../assets/WavyBackground.png')}/>
        <View style={styles.textBundle}>
          <Icon name='medkit-outline' style={{color:'white',textAlign:'center',fontSize:130}}/>
          <Text style={styles.text}>Masuk Sebagai Tenaga Kesehatan</Text>
        </View>
        <View style={{position:'absolute',alignSelf:'flex-end'}}>
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
