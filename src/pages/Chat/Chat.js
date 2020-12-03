import React from 'react';
import { View } from 'react-native';
import { Container, Content, Text, Footer, Input, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../components';
import { BubbleChat } from './components';
import styles from './styles';

const propTypes = {};

const defaultProps = {};

const mockData = [
  {
    message: 'Halo',
    time: '19:48',
    worker: true
  },
  {
    message: 'Hi',
    time: '19:50',
    worker: false
  },
  {
    message: 'Halo',
    time: '19:48',
    worker: true
  },
  {
    message: 'Hi',
    time: '19:50',
    worker: false
  },
  {
    message: 'Halo',
    time: '19:48',
    worker: true
  },
  {
    message: 'Hi',
    time: '19:50',
    worker: false
  },
  {
    message: 'Halo',
    time: '19:48',
    worker: true
  },
  {
    message: 'Hi',
    time: '19:50',
    worker: false
  },
  {
    message: 'Halo',
    time: '19:48',
    worker: true
  },
  {
    message: 'Hi',
    time: '19:50',
    worker: false
  }
];

const Chat = () => {
  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Obrolan"
        onPress={() => Actions.pop()}
      />
      <Content>
        <View>
          {mockData.map((item, index) => (
            <BubbleChat
              key={index}
              message={item.message}
              time={item.time}
              worker={item.item}
            />
          ))}
        </View>
      </Content>
      <Footer>
        <Input />
        <Button>
          <Text>Send</Text>
        </Button>
      </Footer>
    </Container>
  );
};

Chat.propTypes = propTypes;
Chat.defaultProps = defaultProps;

export default Chat;
