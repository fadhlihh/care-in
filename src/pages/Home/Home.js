import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Button, Content, Text, Header } from 'native-base';

const Home = () => {
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      paddingVertical: 8
    }
  });

  const goToLogin = () => {
    Actions.login();
  };
  const goToRegister = () => {
    Actions.register();
  };
  return (
    <Container style={styles.container}>
      <Header>
        <Text>Home</Text>
      </Header>
      <Content>
        <Button onPress={goToLogin}>
          <Text>Login</Text>
        </Button>
        <Button bordered onPress={goToRegister}>
          <Text>Register</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default Home;
