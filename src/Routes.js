import React from 'react';
import { Router, Scene, Tabs } from 'react-native-router-flux';
import {
  Home,
  Login,
  Register,
  RegisterMedicalHistory,
  SelectWorker,
  Checkout
} from './pages';
import { BottomNavigation } from './component';

const Routes = () => (
  <Router>
    <Scene key="root">
      <Scene key="login" component={Login} title="Login" initial />
      <Tabs key="home" tabBarComponent={BottomNavigation} hideNavBar>
        <Scene
          key="order"
          component={Home}
          title="Home"
          iconName="home"
          hideNavBar
        />
        <Scene
          key="history"
          component={Home}
          title="History"
          iconName="history"
          hideNavBar
        />
        <Scene
          key="medicalHistory"
          component={Home}
          title="Rekam Medis"
          iconName="document"
          hideNavBar
        />
        <Scene
          key="profile"
          component={Home}
          title="Profile"
          iconName="user"
          hideNavBar
        />
      </Tabs>
      <Scene key="register" component={Register} title="Register" />
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
        key="registerMedicalHistory"
        component={RegisterMedicalHistory}
        title="Riwayat Kesehatan"
      />
    </Scene>
  </Router>
);

export default Routes;
