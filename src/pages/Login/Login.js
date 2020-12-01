import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Item, Input, Label, Button, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import API from '../../services';
import AuthAction from '../../redux/actions';
import { Storage } from '../../helpers';

const propTypes = {
  setToken: PropTypes.func.isRequired
};

const defaultProps = {};

const Login = (props) => {
  const { setToken } = props;

  useEffect(() => {
    Storage.getToken();
  });

  const handleSubmit = () => {
    const mockData = {
      username: 'dummy',
      password: '12345678'
    };

    API.postGenerateToken(mockData)
      .then(
        (res) => {
          setToken(res.token);
          Storage.storeToken(res.token);
          Toast.show({ text: res.message }, 1000);
          setTimeout(() => Actions.home(), 1000);
        },
        (error) => {
          Toast.show({ text: error.response.data.message }, 3000);
        }
      )
      .catch((error) => {
        console.log(error);
        Toast.show({ text: 'Something went wrong' }, 3000);
      });
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
        />
      </View>
      <View style={styles.formContainer}>
        <Form style={styles.loginForm}>
          <Item inlineLabel>
            <Label>Username</Label>
            <Input />
          </Item>
          <Item inlineLabel>
            <Label>Password</Label>
            <Input />
          </Item>
          <Button full onPress={handleSubmit}>
            <Text>Sign In</Text>
          </Button>
        </Form>
        <View style={styles.separator}>
          <Text>or</Text>
        </View>
        <View style={styles.registerContainer}>
          <Button full onPress={() => Actions.register()}>
            <Text>Register</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

Login.navigationOptions = {
  header: null
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(AuthAction, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);
