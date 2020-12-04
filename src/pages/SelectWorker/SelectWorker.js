import React, { useState, useEffect } from 'react';
import { ActivityIndicator ,View} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Toast, Text, Card, CardItem,Button, Left,Thumbnail} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import Api from '../../services';
import { CardWorker } from './components';
import { Header } from '../../components';
import { StringBuilder } from '../../helpers';
import styles from './styles';

const propTypes = {
  workerType: PropTypes.string.isRequired
};

const defaultProps = {};

const SelectWorker = (props) => {
  const { workerType } = props;

  const [state, setState] = useState({
    position: {},
    worker: [],
    isLoaded: false
  });

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const origin = `${position.coords.latitude} ${position.coords.longitude}`;
        const params = {
          params: {
            origin,
            jenis: workerType,
            limit: 5,
            page: 1,
            berbagiLokasi: true,
            sort: 'berbagiLokasi'
          }
        };

        Api.getWorker(params).then(
          (res) => {
            setState({
              ...state,
              position: position.coords,
              worker: res.nakes,
              isLoaded: true
            });
          },
          (error) => {
            Toast.show({ text: error.response.data.message });
            setState({
              ...state,
              isLoaded: true
            });
          }
        );
      },
      (error) => {
        Toast.show({ text: error.response.data.message });
        setState({
          ...state,
          isLoaded: true
        });
      }
    );
  }, []);

  const renderCardWorker = () => {
    if (state.worker.length !== 0) {
      return state.worker.map((item) => (
        <CardWorker
          key={item.id}
          name={item.nama}
          photoSource={{ uri: StringBuilder.addBaseURL(item.foto) }}
          price={item.harga}
          distance={item.jarak.teks}
          onPress={() => {
            Actions.checkout({
              userPosition: state.position,
              worker: item
            });
          }}
        />
      ));
    }
    return (
      //not avaible
       
      <View style={styles.nothingDefault}>
        <View><Text style={styles.textNothingDefault}>{`Tenaga kesehatan \n tidak ada yang tersedia`}</Text></View>
      </View>

      //availble

      // <Card style={styles.card}>
      //   <CardItem>
      //       <Thumbnail
      //         source={require('../../assets/me_here.jpeg')}
      //         style={styles.img}
      //       />
      //       <View style={styles.subcard}>
      //         <Text style={styles.textSubcard}>Marcell Antonius</Text>
      //         <Text style={styles.doneSubcard}>14.6 km</Text>
      //         <Text style={styles.done2Subcard}> Rp. 100.000</Text>
      //       </View>
      //   </CardItem>
      // </Card>

      //checkout
      // <View style={styles.root}>
      //   <View style={{backgroundColor:'grey',width:'auto',height:291}}>
      //     <Text style={{textAlign:'center',marginVertical:'30%'}}>Getting Maps API</Text>
      //   </View>
      //   <View style={styles.cardProfil}>
      //     <View>
      //       <Thumbnail source={require('../../assets/me_here.jpeg')}style={styles.img} />
      //     </View>
      //     <View style={styles.subCardProfil}>
      //        <Text style={styles.textProfil}>Marcell Antonius</Text>
      //        <Text style={styles.doneProfil}>14.6 km</Text>
      //      </View>
      //   </View>
      //   <Text style={styles.textSubHeading}>Detail Pembayaran</Text>
      //   <View>
      //     <View style={styles.detailCheckOut}>
      //       <Text style={styles.titleCheckOut}>Jasa</Text>
      //       <Text style={styles.titleCheckOut}>100.000</Text>
      //     </View>
      //     <View style={styles.detailCheckOut}>
      //       <Text style={styles.titleCheckOut}>Biaya Transportasi</Text>
      //       <Text style={styles.titleCheckOut}>20.000</Text>
      //     </View>
      //     <View style={styles.detailCheckOut}>
      //       <Text style={styles.totalCheckOut}>Total Pembayaran</Text>
      //       <Text style={styles.totalCheckOut}>120.000</Text>
      //     </View>
      //   </View>
      //   <View>
      //     <Button
      //       full
      //       primary
      //       style={styles.button_save}
      //     >
      //       <Text>Pesan</Text>
      //     </Button>
      //   </View>
      // </View>
    );
  };

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Pilih Dokter"
        onPress={() => Actions.pop()}
      />
      <Content style={styles.cardContainer}>
        {!state.isLoaded ? <ActivityIndicator /> : renderCardWorker()}
      </Content>
    </Container>
  );
};

SelectWorker.propTypes = propTypes;
SelectWorker.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(SelectWorker);
