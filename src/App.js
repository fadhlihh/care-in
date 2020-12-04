import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import Routes from './Routes';
import { store } from './helpers';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="#497CFB" />
        <Root>
          <Routes />
        </Root>
      </View>
    </Provider>
  );
};
export default App;
