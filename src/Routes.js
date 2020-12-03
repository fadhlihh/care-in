import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Router, Scene, Tabs } from 'react-native-router-flux';
import {
  Home,
  Login,
  Register,
  RegisterMedicalHistory,
  SelectWorker,
  Checkout,
  Chat,
  Transaction,
  Profile,
  MedicalHistory,
  EditProfile
} from './pages';
import { BottomNavigation } from './components';
import { LocalStorage } from './helpers';

const Routes = () => {
  const [state, setState] = useState({ token: null, isLoaded: false });

  useEffect(() => {
    const setToken = async () => {
      const token = await LocalStorage.getToken();
      setState({ token, isLoaded: true });
    };

    setToken();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!state.isLoaded ? (
        <ActivityIndicator />
      ) : (
        <Router>
          <Scene key="root">
            <Scene
              key="login"
              component={Login}
              title="Login"
              initial={state.token === null}
            />
            <Tabs
              key="home"
              tabBarComponent={BottomNavigation}
              hideNavBar
              initial={state.token !== null}
            >
              <Scene
                key="order"
                component={Home}
                title="Home"
                iconName="home"
                hideNavBar
              />
              <Scene
                key="history"
                component={Transaction}
                title="Transaksi"
                iconName="swap-horizontal"
                hideNavBar
              />
              <Scene
                key="medicalHistory"
                component={MedicalHistory}
                title="Rekam Medis"
                iconName="pulse"
                hideNavBar
              />
              <Scene
                key="profile"
                component={Profile}
                title="Profil"
                iconName="person"
                hideNavBar
              />
            </Tabs>
            <Scene
              key="selectWorker"
              component={SelectWorker}
              title="Pilih Pekerja"
              hideNavBar
            />
            <Scene
              key="checkout"
              component={Checkout}
              title="Pembayaran"
              hideNavBar
            />
            <Scene
              key="register"
              component={Register}
              title="Register"
              hideNavBar
            />
            <Scene
              key="registerMedicalHistory"
              component={RegisterMedicalHistory}
              title="Riwayat Kesehatan"
              hideNavBar
            />
            <Scene key="chat" component={Chat} title="Obrolan" hideNavBar />
            <Scene
              key="editProfile"
              component={EditProfile}
              title="Edit Profil"
              hideNavBar
            />
          </Scene>
        </Router>
      )}
    </View>
  );
};

export default Routes;
