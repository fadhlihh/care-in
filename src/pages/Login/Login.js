import React from 'react';
import { View, Image } from 'react-native';
import { Form, Item, Input, Label, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

const Login = () => {
  const goToRegister = () => {
    Actions.register();
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
          <Button full>
            <Text>Sign In</Text>
          </Button>
        </Form>
        <View style={styles.separator}>
          <Text>or</Text>
        </View>
        <View style={styles.registerContainer}>
          <Button full onPress={goToRegister}>
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

export default Login;
