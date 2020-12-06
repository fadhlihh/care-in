import React, { useEffect, useState } from 'react';
import {
  View,
  Switch,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {
  Container,
  Toast,
  Text,
  Card,
  Right,
  Button,
  CardItem,
  Content
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { StringBuilder, Status, LocationFormatter } from '../../helpers';
import Api from '../../services';
import { CloudMessaging } from '../../services/Firebase';
import { UserActions, LoadActions } from '../../redux/actions';
import {
  OrderStatus,
  TransactionStatus,
  ToastMessage,
  NotificationType
} from '../../constant';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
  setLoad: PropTypes.func.isRequired
};

const defaultProps = {};

const HomeWorker = (props) => {
  const { user, setUser, load, setLoad } = props;

  const [state, setState] = useState({
    activeTransaction: {
      status: OrderStatus.INACTIVE
    }
  });

  const [sharingLocation, setSharingLocation] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const [userLocation, setUserLocation] = useState({});

  let mapRef;
  const userMarkerRef = null;

  useEffect(() => {
    const fetchUser = async () => {
      Api.getCheckAuth()
        .then(
          (res) => res.user.id,
          () => {
            Toast.show({ text: `Tidak terkoneksi dengan internet` });
          }
        )
        .then((workerId) =>
          Api.getWorker({
            params: {
              id: workerId
            }
          })
        )
        .then(
          (data) => {
            setUser(data.nakes[0]);
            return data.nakes[0].id;
          },
          (e) => {
            Toast.show({ text: e.message });
          }
        )
        .then((userId) => {
          CloudMessaging.sendTokenToServer(userId);
        });
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTransaction = async () => {
      return Api.getTransactionWorker().then(
        (res) => {
          setState({
            ...state,
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
                : { ...state.activeTransaction, status: OrderStatus.INACTIVE }
          });
        },
        (error) => {
          Toast.show({ text: error.message });
        }
      );
    };

    fetchTransaction().then(() => console.log('Fetching transaction...'));
  }, [load]);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'MyMapApp needs access to your location'
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (newPosition) => {
              console.log('Getting location...');
              const position = {
                latitude: newPosition.coords.latitude,
                longitude: newPosition.coords.longitude
              };
              setUserLocation(position);
              setIsLoaded(true);
            },
            (error) => {
              Toast.show({ text: error.message });
              console.log('Error getting location: ', error);
            }
          );
          Geolocation.watchPosition(
            (newPosition) => {
              console.log('Watching location...');
              const position = {
                latitude: newPosition.coords.latitude,
                longitude: newPosition.coords.longitude
              };
              setUserLocation(position);
              setIsLoaded(true);

              if (userMarkerRef !== null)
                userMarkerRef.animateMarkerToCoordinate(position, 500);
            },
            (error) => {
              Toast.show({ text: error.message });
              console.log('Error watching location: ', error);
            }
          );
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestLocationPermission();
  }, [load]);

  const toggleSwitch = () => {
    const body = {
      berbagiLokasi: !sharingLocation,
      lokasi: { ...LocationFormatter.fromMapsToApi(userLocation) }
    };

    Api.putWorker(user.id, body).then(
      () => {
        Toast.show({
          text: `Terima pesanan ${
            !sharingLocation ? 'diaktifkan' : 'dimatikan'
          }`
        });
        setSharingLocation(!sharingLocation);
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

  const handleUpdateTransaction = (body) => {
    let toastMessage;
    let data = {};
    switch (body) {
      case TransactionStatus.ONPROCCESS:
        toastMessage = ToastMessage.Transaction.ACCEPT;
        data = {
          data: {
            type: NotificationType.ORDER_ACCEPTED
          },
          userId: state.activeTransaction.pasienId,
          title: 'Pesanan anda telah diterima',
          body: `${user.nama} akan segera datang`
        };
        break;
      case TransactionStatus.FAILED:
        toastMessage =
          state.activeTransaction.status === OrderStatus.PENDING
            ? ToastMessage.Transaction.DECLINE
            : ToastMessage.Transaction.CANCEL;
        data = {
          data: {
            type: NotificationType.ORDER_DECLINED
          },
          userId: state.activeTransaction.pasienId,
          title: 'Pesanan anda ditolak',
          body: `Buka aplikasi untuk memesan lagi`
        };
        break;
      case TransactionStatus.DONE:
        toastMessage = ToastMessage.Transaction.DONE;
        data = {
          data: {
            type: NotificationType.ORDER_DONE
          },
          userId: state.activeTransaction.pasienId,
          title: 'Pesanan sudah selesai',
          body: `Terimakasih sudah memesan`
        };
        break;
      default:
        break;
    }

    Api.putTransaction(state.activeTransaction.id, body).then(
      () => {
        Toast.show({
          text: toastMessage
        });
        CloudMessaging.sendNotification(data).catch((err) =>
          Toast.show({ text: err.message })
        );
        setLoad(load);
      },
      (error) => {
        Toast.show({
          text: `Gagal untuk mengubah pesanan ${error.response.data.message}`
        });
      }
    );
  };

  const renderMapView = () => {
    return isLoaded ? (
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
        showsUserLocation
      >
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
                  <Text style={styles.nameSubCardOne}>
                    {state.activeTransaction.pasien.nama}
                  </Text>
                  <Text style={styles.statusSubCardOne}>
                    Sedang dalam perjalanan
                  </Text>
                </View>
                <View style={styles.btnSubCardOne}>
                  <Button
                    style={styles.btnCancelDetailOne}
                    onPress={() =>
                      handleUpdateTransaction(TransactionStatus.FAILED)}
                  >
                    <Text style={styles.btnCancelTextOne}>Batalkan</Text>
                  </Button>
                  <Button
                    style={styles.btnSuccessDetailOne}
                    onPress={() =>
                      handleUpdateTransaction(TransactionStatus.DONE)}
                  >
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
                      listener: {
                        id: state.activeTransaction.pasienId,
                        ...state.activeTransaction.pasien
                      },
                      transactionId: state.activeTransaction.id,
                      sender: user
                    })}
                >
                  <Text style={styles.chatTextSubCardOne}>
                    <Text style={{ color: 'white' }}>Chat</Text>
                  </Text>
                </Button>
              </Right>
            </CardItem>
          </View>
        );
      case OrderStatus.INACTIVE:
        return (
          <Card
            style={sharingLocation ? styles.noInfoCard : styles.noInfoCardOFF}
          >
            <View style={styles.noInfoCardBundle}>
              <Text style={styles.noInfoTextCard}>
                {sharingLocation
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
                    thumbColor={sharingLocation ? '#f4f3f4' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={sharingLocation}
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
                  {state.activeTransaction.pasien.nama}
                </Text>
                <Text style={{ color: 'rgba(6, 44, 60, 0.9)', fontSize: 12 }}>
                  {`${state.activeTransaction.meter} m`}
                </Text>
                <View style={styles.option}>
                  <Button
                    style={styles.btnCancelDetailThree}
                    onPress={() =>
                      handleUpdateTransaction(TransactionStatus.FAILED)}
                  >
                    <Text style={styles.btnCancelTextThree}>
                      <Text>Tolak</Text>
                    </Text>
                  </Button>
                  <Button
                    success
                    style={styles.btnSuccessDetailThree}
                    onPress={() =>
                      handleUpdateTransaction(TransactionStatus.ONPROCCESS)}
                  >
                    <Text style={styles.btnSuccessTextThree}>
                      <Text style={{ color: 'white' }}>Terima</Text>
                    </Text>
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
      <Content showsVerticalScrollIndicator={false}>
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
              {state.deposit
                ? StringBuilder.formatCurrency(state.deposit.income)
                : '0'}
            </Text>
          </View>
          <View>
            <Text style={styles.infoMoneyHeader}>Uang yang harus disetor</Text>
            <Text style={styles.infoMoneyTotal}>
              {state.deposit
                ? StringBuilder.formatCurrency(state.deposit.unpaid)
                : '0'}
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
    user: state.userReducer.user,
    load: state.loadReducer.load
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ ...UserActions, ...LoadActions }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeWorker);
