import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Container,
  Toast,
  Left,
  Text,
  Card,
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
import { StringBuilder } from '../../helpers';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired
};

const Home = (props) => {
  const { user, setUser } = props;

  const [state, setState] = useState({ transactionStatus: 'no-transaction' });

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

    const fetchTransaction = async () => {
      const params = {
        params: {
          limit: 5,
          page: 1
        }
      };

      Api.getTransaction(params).then(
        (res) => {
          if (res.transaksiBerjalan !== undefined) {
            Api.getWorker({
              params: { id: res.transaksiBerjalan.nakesId }
            }).then((response) => {
              setState({
                ...state,
                activeTransaction: {
                  ...res.transaksiBerjalan,
                  worker: response.nakes[0]
                },
                transactionStatus: 'active'
              });
            });
          } else if (res.riwayatTransaksi.length !== 0) {
            setState({
              ...state,
              transactionHistory: res.riwayatTransaksi[0],
              transactionStatus: 'inactive'
            });
          }
        },
        (error) => {
          Toast.show({ text: error.response.data.message });
        }
      );
    };

    fetchUser();
    fetchTransaction();
  }, []);

  const renderTransactionCard = (status) => {
    switch (status) {
      case 'active':
        return (
          <Card style={styles.card}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri: StringBuilder.addBaseURL(
                      state.activeTransaction.worker.foto
                    )
                  }}
                  style={styles.img}
                />
                <View style={styles.subcard}>
                  <Text style={styles.textSubcard}>
                    {state.activeTransaction.worker !== undefined
                      ? state.activeTransaction.worker.nama
                      : ''}
                  </Text>
                  <Text style={styles.subtextSubcard}>
                    {state.activeTransaction.status}
                  </Text>
                </View>
              </Left>
              <Right>
                <Button style={styles.chat} onPress={() => Actions.chat()}>
                  <Text style={styles.chatText}>Chat</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
        );
      case 'inactive':
        return (
          <Card style={styles.card}>
            <CardItem>
              <Thumbnail
                source={require('../../assets/me_here.jpeg')}
                style={styles.img}
              />
              <View style={styles.subcard}>
                <Text style={styles.textSubcard}>Marcell Antonius</Text>
                <Text style={styles.doneSubcard}>6 Agustus 2020</Text>
                <Text style={styles.doneSubcard}>
                  Rp. 100.000 •
                  <Text style={styles.doneInfoSubcard}> Selesai</Text>
                </Text>
              </View>
            </CardItem>
          </Card>
        );
      case 'no-transaction':
        return (
          <Card style={styles.card}>
            <CardItem>
              <Text style={styles.noTransSubcard}>
                Tidak ada transaksi tersedia
              </Text>
            </CardItem>
          </Card>
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
              <Text style={{ fontSize: 14 }}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>

          {renderTransactionCard(state.transactionStatus)}

          <View style={styles.feature}>
            <Text style={styles.textSubHeading}>Pesan Tenaga Kesehatan</Text>
            <View style={{ flexDirection: 'row' }}>
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
