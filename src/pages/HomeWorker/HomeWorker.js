import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  Alert,
  View,
  Switch,
  TouchableOpacity
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import {
  Container,
  Toast,
  Left,
  Text,
  Card,
  Right,
  Icon,
  Button,
  CardItem,
  Thumbnail,
  Content
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Api from '../../services';
import { UserActions } from '../../redux/actions';
import get from '../../services/Get';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired
};

const defaultProps = {};

const Home = (props) => {
  const { setUser } = props;

  const userPosition = {
    latitude: -6.9564084,
    longitude: 107.6719725
  };

  const workerPosition = {
    latitude: -6.9562084,
    longitude: 107.6119725
  };

  let mapRef;

  useEffect(() => {
    const fetchUser = async () => {
      Api.getCheckAuth().then(
        (res) => {
          const params = {
            params: {
              id: res.user.id
            }
          };
          Api.getWorker(params).then(
            (data) => {
              setUser(data.nakes);
            },
            (e) => {
              Toast.show({ text: e.message });
            }
          );
        },
        (error) => {
          Toast.show({ text: `Tidak terkoneksi dengan internet` });
          console.log(error);
        }
      );
    };

    fetchUser();
  }, []);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <Container>
      <Content>
        <View style={styles.heading}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Care.In</Text>
          <TouchableOpacity onPress={() => Actions.profile()}>
            <Thumbnail
              small
              source={require('../../assets/marcell-white.jpg')}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoMoney}>
          <View>
            <Text style={styles.infoMoneyHeader}>Total Pemasukan</Text>
            <Text style={styles.infoMoneyTotal}>600.000</Text>
          </View>
          <View>
            <Text style={styles.infoMoneyHeader}>Uang yangg harus disetor</Text>
            <Text style={styles.infoMoneyTotal}>600.000</Text>
          </View>
        </View>

        <View style={styles.map}>
          <MapView
            ref={(ref) => {
              mapRef = ref;
            }}
            style={styles.map}
            region={{
              latitude: userPosition.latitude,
              longitude: userPosition.longitude,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15
            }}
            onLayout={() =>
              mapRef.fitToCoordinates([userPosition, workerPosition], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true
              })}
          >
            <Marker coordinate={userPosition} onMapReady title="Lokasi Kamu" />
            <Marker coordinate={workerPosition} title="Lokasi Nakes" />
          </MapView>
        </View>

        <View style={{ marginHorizontal: 16 }}>
          <View style={styles.subtitle}>
            <Text style={styles.subHeadingLeft}>Pesanan</Text>
            <TouchableOpacity onPress={() => Actions.transaction()}>
              <Text style={styles.subHeadingRight}>Lihat Riwayat</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.card}>
            <CardItem>
              <Left>
                <View>
                  <View style={styles.subCardOne}>
                    <Text style={styles.nameSubCardOne}>Marcell Antonius</Text>
                    <Text style={styles.statusSubCardOne}>
                      Sedang dalam perjalanan
                    </Text>
                  </View>
                  <View style={styles.btnSubCardOne}>
                    <Button style={styles.btnCancelDetailOne}>
                      <Text style={styles.btnCancelTextOne}>Batalkan</Text>
                    </Button>
                    <Button style={styles.btnSuccessDetailOne}>
                      <Text style={styles.btnSuccessTextOne}>Selesai</Text>
                    </Button>
                  </View>
                </View>
              </Left>
              <Right>
                <Button
                  iconLeft
                  style={styles.chatSubCardOne}
                  onPress={() => Actions.chat()}
                >
                  <Icon name="paper-plane" style={{ fontSize: 10 }} />
                  <Text style={styles.chatTextSubCardOne}>Chat</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <View style={styles.cardBundle}>
              <View style={{ marginLeft: '0%' }}>
                <Text style={styles.nameSubCardOne}>Marcell Antonius</Text>
                <Text style={{ color: 'rgba(6, 44, 60, 0.9)', fontSize: 12 }}>
                  Sedang dalam perjalanan
                </Text>
                <View style={styles.option}>
                  <Button style={styles.btnCancelDetailThree}>
                    <Text style={styles.btnCancelTextThree}>Tolak</Text>
                  </Button>
                  <Button success style={styles.btnSuccessDetailThree}>
                    <Text style={styles.btnSuccessTextThree}>Terima</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.noInfoCard}>
            <View style={styles.noInfoCardBundle}>
              <Text style={styles.noInfoTextCard}>
                Tidak ada pesan yang masuk
              </Text>
              <View style={styles.switchCard}>
                <View>
                  <Switch
                    style={{ width: 56, height: 28 }}
                    trackColor={{
                      false: 'rgba(255, 255, 255, 0.5)',
                      true: 'rgba(255, 255, 255, 0.5)'
                    }}
                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View>
                  <Text style={styles.textCard}>Terima Pesan</Text>
                </View>
              </View>
            </View>
          </Card>

          <Card style={styles.noInfoCardOFF}>
            <View style={styles.noInfoCardBundle}>
              <Text style={styles.noInfoTextCard}>
                Tidak ada pesan yang masuk
              </Text>
              <View style={styles.switchCard}>
                <View>
                  <Switch
                    style={{ width: 56, height: 28 }}
                    trackColor={{
                      false: 'rgba(255, 255, 255, 0.5)',
                      true: 'rgba(255, 255, 255, 0.5)'
                    }}
                    thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
                <View>
                  <Text style={styles.textCard}>Terima Pesan</Text>
                </View>
              </View>
            </View>
          </Card>
        </View>
      </Content>
    </Container>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(UserActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
