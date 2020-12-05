import React, { useEffect, useState } from 'react';
import {
  View,
  Switch,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
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
  Content
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { StringBuilder, Status, LocationFormatter } from '../../helpers';
import Api from '../../services';
import { UserActions } from '../../redux/actions';
import { OrderStatus } from '../../constant';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired
};

const defaultProps = {};

const HomeWorker = (props) => {
  const { user, setUser } = props;

  const [state, setState] = useState({
    isLoaded: false,
    sharingLocation: false,
    activeTransaction: {
      status: OrderStatus.INACTIVE
    }
  });

  const [userLocation, setUserLocation] = useState({});

  let mapRef;

  useEffect(() => {
    const fetchUser = async () => {
      return Api.getCheckAuth().then(
        (res) => {
          const params = {
            params: {
              id: res.user.id
            }
          };
          Api.getWorker(params).then(
            (data) => {
              setUser(data.nakes[0]);
            },
            (e) => {
              Toast.show({ text: e.message });
            }
          );
        },
        () => {
          Toast.show({ text: `Tidak terkoneksi dengan internet` });
        }
      );
    };

    const fetchTransaction = async () => {
      return Api.getTransactionWorker().then(
        (res) => {
          return {
            deposit: {
              income: res.totalPendapatan,
              unpaid: res.totalBelumSetor,
              paid: res.totalTelahSetor
            },
            activeTransaction:
              res.transaksiBerjalan !== undefined
                ? {
                    ...res.transaksiBerjalan,
                    pasienLokasi: LocationFormatter.fromApiToGmaps(
                      res.transaksiBerjalan.pasienLokasi
                    ),
                    status: Status.getStatus(res.transaksiBerjalan.status)
                  }
                : { ...state.activeTransaction }
          };
        },
        (error) => {
          Toast.show({ text: error.message });
        }
      );
    };

    const getUserLocation = (data) => {
      Geolocation.getCurrentPosition(
        (position) => {
          setState(
            {
              ...state,
              ...data,
              isLoaded: true
            },
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            })
          );
        },
        (error) => Toast.show({ text: error.message }),
        { enableHighAccuracy: false, timeout: 5000 }
      );
    };

    const watchUserLocation = () => {
      Geolocation.watchPosition((lastPosition) => {
        setUserLocation({
          latitude: lastPosition.coords.latitude,
          longitude: lastPosition.coords.longitude
        });
        console.log('location set : ', {
          latitude: lastPosition.coords.latitude,
          longitude: lastPosition.coords.longitude
        });
      });
    };

    fetchUser()
      .then(() => fetchTransaction())
      .then((data) => getUserLocation(data));
    watchUserLocation();
  }, []);

  const toggleSwitch = () => {
    const body = {
      ...user,
      berbagiLokasi: !state.sharingLocation,
      lokasi: { ...LocationFormatter.fromMapsToApi(userLocation) }
    };

    Api.putWorker(user.id, body).then(
      (res) => {
        Toast.show({ text: res.message });
        setState({ ...state, sharingLocation: !state.sharingLocation });
      },
      (error) => {
        Toast.show({ text: error.response.data.message });
      }
    );
  };

  const reCenterMaps = () => {
    const coordinates = [userLocation];
    if (Status.validToGetPatientLocation(state.activeTransaction.status)) {
      coordinates.push(state.activeTransaction.pasienLokasi);
    }
    mapRef.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true
    });
  };

  const handleUpdateTransaction = (response) => {
    let body;
    if (response) {
      body = {
        status: 'berjalan',
        berhasil: false
      };
    } else {
      body = {
        status: 'selesai',
        berhasil: true
      };
    }

    Api.putTransaction(state.activeTransaction.id, body)
      .then(
        (res) => {
          Toast.show({
            text: response ? 'Pesanan diterima' : 'Pesanan ditolak'
          });
        },
        (error) => {
          Toast.show({
            text: `Gagal untuk mengubah pesanan ${error.response.data.message}`
          });
        }
      )
      .then(
        () => {
          if (response) {
            Api.getTransactionWorker().then(
              (res) => {
                return {
                  deposit: {
                    income: res.totalPendapatan,
                    unpaid: res.totalBelumSetor,
                    paid: res.totalTelahSetor
                  },
                  activeTransaction:
                    res.transaksiBerjalan !== undefined
                      ? {
                          ...res.transaksiBerjalan,
                          pasienLokasi: LocationFormatter.fromApiToGmaps(
                            res.transaksiBerjalan.pasienLokasi
                          ),
                          status: Status.getStatus(res.transaksiBerjalan.status)
                        }
                      : { ...state.activeTransaction }
                };
              },
              (error) => {
                Toast.show({
                  text: `Gagal untuk mengubah pesanan ${error.response.data.message}`
                });
              }
            );
          } else {
            setState({
              ...state,
              activeTransaction: {
                status: OrderStatus.INACTIVE
              }
            });
          }
        },
        (error) => {
          Toast.show({
            text: `Gagal untuk mengubah pesanan ${error.response.data.message}`
          });
        }
      );
  };

  const renderMapView = () => {
    return state.isLoaded ? (
      <MapView
        ref={(ref) => {
          mapRef = ref;
        }}
        style={styles.map}
        region={{
          ...userLocation,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15
        }}
        onLayout={reCenterMaps}
      >
        <Marker coordinate={userLocation} onMapReady title="Lokasi Kamu" />
        {Status.validToGetPatientLocation(state.activeTransaction.status) && (
          <Marker
            coordinate={state.activeTransaction.pasienLokasi}
            title="Lokasi Nakes"
          />
        )}
      </MapView>
    ) : (
      <ActivityIndicator />
    );
  };

  const renderTransactionCard = (status) => {
    switch (status) {
      case OrderStatus.ACTIVE:
        return (
          <View style={styles.card}>
            <CardItem style={styles.bundle}>
                <View>
                  <View style={styles.subCardOne}>
                    <Text style={styles.nameSubCardOne}>Antonius</Text>
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
              <Right style={styles.chatBundle}>
                <Button
                  iconLeft
                  style={styles.chatSubCardOne}
                  onPress={() =>
                    Actions.chat({
                      patientId: state.activeTransaction.pasienId
                    })}
                >
                  <Icon name="paper-plane" style={{ fontSize: 10 }} />
                  <Text style={styles.chatTextSubCardOne}>Chat</Text>
                </Button>
              </Right>
            </CardItem>
          </View>
        );
      case OrderStatus.INACTIVE:
        return (
          <Card
            style={
              state.sharingLocation ? styles.noInfoCard : styles.noInfoCardOFF
            }
          >
            <View style={styles.noInfoCardBundle}>
              <Text style={styles.noInfoTextCard}>
                {state.sharingLocation
                  ? 'Tidak ada pesan yang masuk'
                  : 'Kamu tidak akan menerima pesanan'}
              </Text>
              <View style={styles.switchCard}>
                <View>
                  <Switch
                    style={{ width: 56, height: 28 }}
                    trackColor={{
                      false: 'rgba(255, 255, 255, 0.5)',
                      true: 'rgba(255, 255, 255, 0.5)'
                    }}
                    thumbColor={state.sharingLocation ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={state.sharingLocation}
                  />
                </View>
                <View>
                  <Text style={styles.textCard}>Terima Pesanan</Text>
                </View>
              </View>
            </View>
          </Card>
        );
      case OrderStatus.PENDING:
        return (
          <Card style={styles.card}>
            <View style={styles.cardBundle}>
              <View style={{ marginLeft: '0%' }}>
                <Text style={styles.nameSubCardOne}>
                  {state.activeTransaction.pasienId}
                </Text>
                <Text style={{ color: 'rgba(6, 44, 60, 0.9)', fontSize: 12 }}>
                  {`${state.activeTransaction.meter} m`}
                </Text>
                <View style={styles.option}>
                  <Button
                    style={styles.btnCancelDetailThree}
                    onPress={() => handleUpdateTransaction(false)}
                  >
                    <Text style={styles.btnCancelTextThree}>Tolak</Text>
                  </Button>
                  <Button
                    success
                    style={styles.btnSuccessDetailThree}
                    onPress={() => handleUpdateTransaction(true)}
                  >
                    <Text style={styles.btnSuccessTextThree}>Terima</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <Container>
      <Content>
        <View style={styles.heading}>
          <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Care.in</Text>
          <TouchableOpacity onPress={() => Actions.profile()}>
            <Image
              style={styles.thumbnail}
              source={{ uri: StringBuilder.addBaseURL(user.foto) }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.infoMoney}>
          <View>
            <Text style={styles.infoMoneyHeader}>Total Pendapatan</Text>
            <Text style={styles.infoMoneyTotal}>
              {state.deposit ? state.deposit.income : '0'}
            </Text>
          </View>
          <View>
            <Text style={styles.infoMoneyHeader}>Uang yang harus disetor</Text>
            <Text style={styles.infoMoneyTotal}>
              {state.deposit ? state.deposit.unpaid : '0'}
            </Text>
          </View>
        </View>

        <View style={styles.map}>{renderMapView()}</View>

        <View style={{ marginHorizontal: 16 }}>
          <View style={styles.subtitle}>
            <Text style={styles.subHeadingLeft}>Pesanan</Text>
            <TouchableOpacity onPress={() => Actions.transaction()}>
              <Text style={styles.subHeadingRight}>Lihat Riwayat</Text>
            </TouchableOpacity>
          </View>
          {renderTransactionCard(state.activeTransaction.status)}
        </View>
      </Content>
    </Container>
  );
};

HomeWorker.propTypes = propTypes;
HomeWorker.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(UserActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeWorker);
