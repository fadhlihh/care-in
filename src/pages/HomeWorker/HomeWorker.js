import React, { useEffect } from 'react';
import { BackHandler, Alert, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Toast, Left, Text,Card, Right, Icon, Button, CardItem, Thumbnail, Title, Subtitle, Content} from 'native-base';
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

  const backAction = () => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel'
      },
      { text: 'YES', onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    const fetchUser = async () => {
      Api.getCheckAuth().then(
        (res) => {
          Api.getUser(res.user.id).then(
            (data) => {
              setUser(data.pasien);
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

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <Container>
      <Content>
      <View style={{ flexDirection: 'row',marginHorizontal:16,marginTop:30,marginBottom:'7%', justifyContent: 'space-between'}}>
        <Text style={{fontWeight:'bold',fontSize:24}}>Care.In</Text>
        <Thumbnail small source={require('../../assets/marcell-white.jpg')} style={{borderRadius:20}}/>
      </View>
      <View style={{ flexDirection: 'row',marginHorizontal:36,marginTop:20,marginBottom:'7%', justifyContent: 'space-between'}}>
        <View>
        <Text style={{fontSize:12,color:'rgba(6, 44, 60, 0.9)'}}>Total Pemasukan</Text>
        <Text style={{fontWeight:'bold',fontSize:28,color:'rgba(6, 44, 60, 0.9)'}}>600.000</Text>
        </View>
        <View>
        <Text style={{fontSize:12,color:'rgba(6, 44, 60, 0.9)'}}>Uang yangg harus disetor</Text>
        <Text style={{fontWeight:'bold',fontSize:28,color:'rgba(6, 44, 60, 0.9)'}}>600.000</Text>
        </View>
      </View>

      <View style={{width:396,height:396,backgroundColor:'grey',justifyContent:'center'}}>
          <Text style={{color:'white',textAlign:'center'}}> Loading.. getting maps api</Text>
      </View>

      <View style={{marginHorizontal:16}}>
      <View style={styles.subtitle}>
        <Text style={{fontWeight:'bold',fontSize:14,color:'rgba(6, 44, 60, 0.9)'}}>Pesanan</Text>
        <Text style={{fontSize:14,color:'rgba(6, 44, 60, 0.9)'}}>Lihat Riwayat</Text>
      </View>

    
      <Card style={styles.card}>
        <CardItem>
          <Left>
            <View>
              <View style={{marginLeft:'-10%'}}>
              <Text style={{color:'rgba(6, 44, 60, 0.9)',fontWeight:'bold',fontSize:18}}>Marcell Antonius</Text>
              <Text style={{color:'rgba(6, 44, 60, 0.9)',fontSize:12}}>Sedang dalam perjalanan</Text>
              </View>
              <View style={{flexDirection:'row', marginTop:5,marginLeft:15}}>
                <Button style={{backgroundColor:'#EB5757',opacity:0.5,width:85,height:32,borderRadius:8}}>
                  <Text style={{fontSize:10,color:'red'}}>Batalkan</Text>
                </Button>
                <Button style={{backgroundColor:'#27AE60',opacity:0.5,width:75,height:32,marginLeft:4,borderRadius:8}}>
                  <Text style={{fontSize:10,color:'green'}}>Selesai</Text>
                </Button>
              </View>
            </View>
          </Left>
          <Right>
            <Button iconLeft  style={{backgroundColor:'#497CFB',width:79,height:32,marginTop:45,marginRight:10,borderRadius:8}}>
              <Icon name='paper-plane' style={{fontSize:10}}/>
              <Text style={{fontSize:10,color:'white',textAlign:'center'}}>Chat</Text>
            </Button>
          </Right>
        </CardItem>
      </Card>

      <Card style={styles.card}>
        <CardItem>
            <View>
              <View style={{marginLeft:'10%'}}>
              <Text style={{color:'rgba(6, 44, 60, 0.9)',fontWeight:'bold',fontSize:18}}>Marcell Antonius</Text>
              <Text style={{color:'rgba(6, 44, 60, 0.9)',fontSize:12}}>Sedang dalam perjalanan</Text>
              </View>
              <View style={{flexDirection:'row',position:'absolute',right:0, marginTop:10}}>
                <Button style={{backgroundColor:'#EB5757',opacity:0.5,width:85,height:32,borderRadius:8}}>
                  <Text style={{fontSize:10,color:'red'}}>Batalkan</Text>
                </Button>
                <Button style={{backgroundColor:'#27AE60',opacity:0.5,width:75,height:32,marginLeft:4,borderRadius:8}}>
                  <Text style={{fontSize:10,color:'green'}}>Selesai</Text>
                </Button>
              </View>
            </View>
         
        </CardItem>
      </Card>
      
      </View>
      <View style={{marginHorizontal:10,marginTop:30}}>
        <Text style={{fontWeight:'bold'}}>Pesan Tenaga Kesehatan</Text>
        <View style={{flexDirection:'row'}}>
          <Feature title='Dokter' imageSource={require('../../assets/dokter.png')}/>
          <Feature title='Psikolog' imageSource={require('../../assets/psikolog.png')}/>
          <Feature title='Perawat' imageSource={require('../../assets/perawat.png')}/>
        </View>
      </View>
      
      <View style={styles.cardContainer}>
        <CardMenu
          label="Dokter"
          imageSource={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          onPress={() => Actions.selectWorker({ workerType: 'dokter' })}
        />
        <CardMenu
          label="Perawat"
          imageSource={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          onPress={() => Actions.selectWorker({ workerType: 'perawat' })}
          reverse
        />
        <CardMenu
          label="Psikolog"
          imageSource={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
          onPress={() => Actions.selectWorker({ workerType: 'psikolog' })}
        />
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
