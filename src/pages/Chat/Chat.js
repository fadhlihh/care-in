import React from 'react';
import { Container, Content, Text, Footer, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../components';
import styles from './styles';

const propTypes = {};

const defaultProps = {};

const mockData = {
  name: 'dr. Lucy Purnama',
  photoSource: 'https://reactnative.dev/img/tiny_logo.png',
  price: 100000,
  distance: 4,
  transportCost: 8000,
  totalPrice: 108000
};

const Chat = () => {
  return (
    <Container>
      <Header iconName="back" title="Obrolan" onPress={() => Actions.pop()} />
      <Content>
        <Text>Chat page</Text>
      </Content>
      <Footer>
        <Text>Footer</Text>
      </Footer>
    </Container>
  );
};

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

export default Chat;
