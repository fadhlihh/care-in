import React from 'react';
import { View } from 'react-native';
import { Container } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header, CardMenu } from './components';
import styles from './styles';

const Home = (props) => {
  const goToSelectWorker = (workerType) => {
    Actions.selectWorker(workerType);
  };

  return (
    <Container>
      <Header />
      <View style={styles.cardContainer}>
        <CardMenu
          label="Dokter"
          imageSource={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          onPress={() => goToSelectWorker('doctor')}
        />
        <CardMenu
          label="Perawat"
          imageSource={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          onPress={() => goToSelectWorker('nurse')}
          reverse
        />
        <CardMenu
          label="Psikolog"
          imageSource={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          onPress={() => goToSelectWorker('psychologist')}
        />
      </View>
    </Container>
  );
};

export default Home;
