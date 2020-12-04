import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Router, Scene, Tabs } from 'react-native-router-flux';
import {
  Home,
  Login,
  SelectWorker,
  Checkout,
  Chat,
  Transaction,
  Profile,
  MedicalHistory,
  EditProfile,
  LoginWorker,
  HomeWorker
} from './pages';
import { StepOne, StepTwo, StepThree, StepFour } from './pages/Register/steps';
import { LocalStorage, BackAction } from './helpers';

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
              onBack={() => BackAction.exit()}
            />
            <Scene key="register" hideNavBar>
              <Scene
                key="registerStepOne"
                component={StepOne}
                title="Daftar"
                hideNavBar
              />
              <Scene
                key="registerStepTwo"
                component={StepTwo}
                title="Daftar"
                hideNavBar
              />
              <Scene
                key="registerStepThree"
                component={StepThree}
                title="Daftar"
                hideNavBar
              />
              <Scene
                key="registerStepFour"
                component={StepFour}
                title="Daftar"
                hideNavBar
              />
            </Scene>
            <Scene
              key="home"
              component={Home}
              title="Home"
              iconName="home"
              hideNavBar
              initial={state.token !== null}
              onBack={() => {
                BackAction.exit();
                console.log('back pressed');
              }}
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
            <Scene key="chat" component={Chat} title="Obrolan" hideNavBar />
            <Scene
              key="editProfile"
              component={EditProfile}
              title="Edit Profil"
              hideNavBar
            />
            <Scene
              key="loginWorker"
              component={LoginWorker}
              title="Login Nakes"
              hideNavBar
            />
            <Scene
              key="homeWorker"
              component={HomeWorker}
              title="Home Nakes"
              hideNavBar
            />
          </Scene>
        </Router>
      )}
    </View>
  );
};

export default Routes;
