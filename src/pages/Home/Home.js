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
import { UserActions } from '../../redux/actions';
import { StringBuilder, DateFormatter, Cost } from '../../helpers';
import { OrderStatus } from '../../constant';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired
};

const Home = (props) => {
  const { user, setUser } = props;

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
      Api.getCheckAuth().then(
        (res) => {
          Api.getUser(res.user.id).then(
            (data) => {
              setUser(data.pasien);
            },
            (e) => {
              Toast.show({ text: e.response.data.message });
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
            console.log(res.riwayatTransaksi[0]);
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

    fetchTransaction();
  }, [reload]);

  const handleCancelTransaction = () => {
    const body = {
      status: 'selesai',
      berhasil: true
    };

    Api.putTransaction(state.activeTransaction.id, body).then(
      () => {
        Toast.show({
          text: 'Pesanan dibatalkan'
        });
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
                  <Button style={styles.chat} onPress={() => Actions.chat()}>
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
             <View noShadow >
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
                  <Button style={styles.chatBatalkan} onPress={handleCancelTransaction}>
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
                     <Text  style={styles.doneSubcardTwo}>{`Rp. ${Cost.getTotal(state.lastTransaction)}`}</Text>
                     {` • `}
                     <Text
                       style={
                         state.lastTransaction.sakit
                           ? styles.done
                           : styles.failed
                       }
                     >
                       {state.lastTransaction.sakit ? 'Berhasil' : 'Gagal'}
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
      <Content>
        <Header name={user !== undefined ? user.nama : ''} />
        <View style={styles.root}>
          <View style={styles.subtitle}>
            <Text style={styles.textSubHeading}>Transaksi</Text>
            <TouchableOpacity onPress={() => Actions.transaction()}>
              <Text style={styles.textSubHeadingAll}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          {renderTransactionCard(transactionStatus)}

          <View style={styles.feature}>
            <Text style={styles.textSubHeading}>Pesan Tenaga Kesehatan</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Feature
                title="Dokter"
                imageSource={require('../../assets/dokter.png')}
                onPress={() => Actions.selectWorker({ workerType: 'dokter' })}
              />
              <Feature
                title="Psikolog"
                imageSource={require('../../assets/psikolog.png')}
                onPress={() => Actions.selectWorker({ workerType: 'psikolog' })}
              />
              <Feature
                title="Perawat"
                imageSource={require('../../assets/perawat.png')}
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
    user: state.userReducer.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(UserActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
