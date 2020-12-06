import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Toast,
  Text,
  Right,
  CardItem,
  Thumbnail,
  Content,
  Button
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header, Feature } from './components';
import styles from './styles';
import Api from '../../services';
import { CloudMessaging } from '../../services/Firebase';
import { UserActions } from '../../redux/actions';
import { StringBuilder, DateFormatter, Cost } from '../../helpers';
import { OrderStatus, NotificationType } from '../../constant';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired
};

const Home = (props) => {
  const { user, setUser, load } = props;

  const [state, setState] = useState({
    activeTransaction: {},
    lastTransaction: {}
  });

  const [transactionStatus, setTransactionStatus] = useState(
    OrderStatus.NOTRANCACTION
  );

  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      Api.getCheckAuth()
        .then(
          (res) => {
            return res.user.id;
          },
          () => {
            Toast.show({ text: `Tidak terkoneksi dengan internet` });
          }
        )
        .then((userId) => {
          return Api.getUser(userId);
        })
        .then(
          (data) => {
            setUser(data.pasien);
            return data.pasien.id;
          },
          (e) => {
            Toast.show({ text: e.response.data.message });
          }
        )
        .then(
          (userId) => CloudMessaging.sendTokenToServer(userId),
          (error) => Toast.show({ text: error.message })
        );
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTransaction = async () => {
      const params = {
        params: {
          limit: 5,
          page: 1
        }
      };

      Api.getTransaction(params).then(
        (res) => {
          // When active transaction exist
          if (res.transaksiBerjalan !== undefined) {
            setState({
              ...state,
              activeTransaction: res.transaksiBerjalan
            });
            setTransactionStatus(
              res.transaksiBerjalan.status === 'pending'
                ? OrderStatus.PENDING
                : OrderStatus.ACTIVE
            );
          }
          // When medicalHisory exist
          else if (res.riwayatTransaksi.length !== 0) {
            setState({
              ...state,
              lastTransaction: res.riwayatTransaksi[0]
            });
            setTransactionStatus(OrderStatus.INACTIVE);
          }
        },
        (error) => {
          Toast.show({ text: error.response.data.message });
        }
      );
    };

    fetchTransaction().then(() => console.log('Fetching transaction...'));
  }, [reload, load]);

  const handleCancelTransaction = () => {
    const body = {
      status: 'selesai',
      berhasil: false
    };

    Api.putTransaction(state.activeTransaction.id, body).then(
      () => {
        Toast.show({
          text: 'Pesanan dibatalkan'
        });
        const data = {
          data: {
            type: NotificationType.ORDER_CANCELED
          },
          userId: state.activeTransaction.nakesId,
          title: 'Pesanan anda dibatalkan',
          body: `${user.nama} telah membatalkan pemesanan`
        };
        CloudMessaging.sendNotification(data);

        setReload(!reload);
      },
      (error) => {
        Toast.show({
          text: `Gagal untuk membatalkan pesanan :  ${error.response.data.message}`
        });
      }
    );
  };

  const renderTransactionCard = (status) => {
    switch (status) {
      case OrderStatus.ACTIVE:
        return (
          <View style={styles.card}>
            <View noShadow>
              <CardItem style={styles.bundle}>
                <Thumbnail
                  source={{
                    uri: StringBuilder.addBaseURL(
                      state.activeTransaction.nakes.foto
                    )
                  }}
                  style={styles.img}
                />
                <View style={styles.subcard}>
                  <Text style={styles.textSubcard}>
                    {state.activeTransaction.nakes !== undefined
                      ? state.activeTransaction.nakes.nama
                      : ''}
                  </Text>
                  <Text style={styles.subtextSubcard}>
                    Sedang dalam perjalanan
                  </Text>
                </View>
                <Right style={styles.chatBundle}>
                  <Button
                    style={styles.chat}
                    onPress={() =>
                      Actions.chat({
                        listener: {
                          id: state.activeTransaction.nakesId,
                          ...state.activeTransaction.nakes
                        },
                        transactionId: state.activeTransaction.id,
                        sender: user
                      })}
                  >
                    <Text style={styles.chatTextBundle}>
                      <Text style={styles.chatText}>Chat</Text>
                    </Text>
                  </Button>
                </Right>
              </CardItem>
            </View>
          </View>
        );
      case OrderStatus.PENDING:
        return (
          <View style={styles.card}>
            <View noShadow>
              <CardItem style={styles.bundle}>
                <Thumbnail
                  source={{
                    uri: StringBuilder.addBaseURL(
                      state.activeTransaction.nakes.foto
                    )
                  }}
                  style={styles.img}
                />
                <View style={styles.subcard}>
                  <Text style={styles.textSubcard}>
                    {state.activeTransaction.nakes !== undefined
                      ? state.activeTransaction.nakes.nama
                      : ''}
                  </Text>
                  <Text style={styles.subtextSubcard}>
                    Sedang menunggu konfirmasi
                  </Text>
                </View>
                <Right style={styles.chatBundleBatalkan}>
                  <Button
                    style={styles.chatBatalkan}
                    onPress={handleCancelTransaction}
                  >
                    <Text style={styles.chatTextBundle}>
                      <Text style={styles.chatTextBatalkan}>Batalkan</Text>
                    </Text>
                  </Button>
                </Right>
              </CardItem>
            </View>
          </View>
        );
      case OrderStatus.INACTIVE:
        return (
          <View style={styles.card}>
            <TouchableOpacity noShadow onPress={Actions.transaction}>
              <CardItem style={styles.bundle}>
                <Thumbnail
                  source={{
                    uri: StringBuilder.addBaseURL(
                      state.lastTransaction.nakes.foto
                    )
                  }}
                  style={styles.img}
                />
                <View style={styles.subcardBundle}>
                  <Text style={styles.textSubcard}>
                    {state.lastTransaction.nakes.nama}
                  </Text>
                  <Text style={styles.doneSubcard}>
                    {DateFormatter.getLegibleDate(
                      state.lastTransaction.waktuDibuat
                    )}
                  </Text>
                  <Text style={styles.doneSubcard}>
                    <Text style={styles.doneSubcardTwo}>
                      {`Rp. ${StringBuilder.formatCurrency(
                        Cost.getTotal(state.lastTransaction)
                      )}`}
                    </Text>
                    {` • `}
                    <Text
                      style={
                        state.lastTransaction.berhasil
                          ? styles.done
                          : styles.failed
                      }
                    >
                      {state.lastTransaction.berhasil ? 'Berhasil' : 'Gagal'}
                    </Text>
                  </Text>
                </View>
              </CardItem>
            </TouchableOpacity>
          </View>
        );
      case OrderStatus.NOTRANCACTION:
        return (
          <View style={styles.card}>
            <View noShadow>
              <CardItem style={styles.bundle}>
                <View style={styles.textBundle}>
                  <Text style={styles.noTransSubcard}>
                    Tidak ada transaksi tersedia
                  </Text>
                </View>
              </CardItem>
            </View>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Container>
      <Content showsVerticalScrollIndicator={false}>
        <Header name={user !== undefined ? user.nama : ''} />
        <View style={styles.root}>
          <View style={styles.subtitle}>
            <Text style={styles.textSubHeading}>Transaksi</Text>
            <TouchableOpacity onPress={Actions.transaction}>
              <Text style={styles.textSubHeadingAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          {renderTransactionCard(transactionStatus)}

          <View style={styles.feature}>
            <Text style={styles.textSubHeading}>Pesan Tenaga Kesehatan</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Feature
                title="Dokter"
                color="blue"
                imageSource={require('../../assets/images/dokter-menu.png')}
                onPress={() => Actions.selectWorker({ workerType: 'dokter' })}
              />
              <Feature
                title="Psikolog"
                color="red"
                imageSource={require('../../assets/images/psikolog-menu.png')}
                onPress={() => Actions.selectWorker({ workerType: 'psikolog' })}
              />
              <Feature
                title="Perawat"
                color="orange"
                imageSource={require('../../assets/images/perawat-menu.png')}
                onPress={() => Actions.selectWorker({ workerType: 'perawat' })}
              />
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

Home.propTypes = propTypes;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    load: state.loadReducer.load
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(UserActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
