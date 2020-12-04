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
      <Header name={user !== undefined ? user.nama : ''} />
      
      <View style={{ flexDirection: 'row',marginHorizontal:10,marginTop:30,marginBottom:'7%', justifyContent: 'space-between'}}>
        <Text style={{fontWeight:'bold'}}>Transaksi</Text>
        <Text>Lihat Semua</Text>
      </View>
      
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={require('../../assets/marcell-white.jpg')} style={{width:100,height:100,borderRadius:10}}/>
            <View style={{alignItems:'flex-start',marginLeft:10}}>
              <Title style={{color:'black'}}>Marcell Antonius</Title>
              <Subtitle style={{color:'black'}}>Sedang dalam perjalanan</Subtitle>
            </View>
          </Left>
          <Right>
            <View style={{backgroundColor:'#E3292A',borderRadius:15}}>
              <Text style={{fontSize:15,paddingLeft:20,paddingRight:20,paddingTop:'5%',paddingBottom:'5%', color:'white' }} >Chat</Text>
            </View>  
          </Right>
        </CardItem>
      </Card>

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
