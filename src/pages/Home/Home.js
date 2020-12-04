import React, { useEffect } from 'react';
import { View } from 'react-native';
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
  Content
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header, CardMenu, Feature } from './components';
import styles from './styles';
import Api from '../../services';
import { UserActions } from '../../redux/actions';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired
};

const Home = (props) => {
  const { user, setUser } = props;

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

  return (
    <Container>
      <Content>
        <Header name={user !== undefined ? user.nama : ''} />
        <View style={styles.root}>
          <View style={styles.subtitle}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Transaksi</Text>
            <Text style={{ fontSize: 14 }}>Lihat Semua</Text>
          </View>

          <Card style={styles.card}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={require('../../assets/me_here.jpeg')}
                  style={styles.img}
                />
                <View style={styles.subcard}>
                  <Text
                    style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
                  >
                    Marcell Antonius
                  </Text>
                  <Text style={{ color: 'black', fontSize: 12 }}>
                    Sedang dalam perjalanan
                  </Text>
                </View>
              </Left>
              <Right>
                <View style={styles.chat}>
                  <Text style={styles.chatText}>Chat</Text>
                </View>
              </Right>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem>
              <Left>
                <Thumbnail
                  source={require('../../assets/me_here.jpeg')}
                  style={styles.img}
                />
                <View style={styles.subcard}>
                  <Text
                    style={{ color: 'black', fontWeight: 'bold', fontSize: 18 }}
                  >
                    Marcell Antonius
                  </Text>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 14,
                      paddingRight: '12%'
                    }}
                  >
                    6 Agustus 2020
                  </Text>
                  <Text
                    style={{ color: 'black', fontSize: 14, fontWeight: '600' }}
                  >
                    Rp. 100.000 •
                    <Text
                      style={{
                        color: 'green',
                        fontSize: 14,
                        fontWeight: '600'
                      }}
                    >
                      Selesai
                    </Text>
                  </Text>
                </View>
              </Left>
            </CardItem>
          </Card>

          <Card style={styles.card}>
            <CardItem>
              <Text
                style={{
                  textAlign: 'center',
                  marginVertical: 20,
                  marginHorizontal: '12%',
                  color: 'grey',
                  fontSize: 18
                }}
              >
                Tidak ada transaksi tersedia
              </Text>
            </CardItem>
          </Card>

          <View style={styles.feature}>
            <Text style={{ fontWeight: 'bold' }}>Pesan Tenaga Kesehatan</Text>
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
