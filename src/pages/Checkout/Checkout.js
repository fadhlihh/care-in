import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Text,
  Footer,
  Button,
  View,
  Toast
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';
import { Header } from '../../components';
import styles from './styles';
import { LocationFormatter, StringBuilder } from '../../helpers';
import Api from '../../services';

const propTypes = {
  userPosition: PropTypes.objectOf(PropTypes.any).isRequired,
  worker: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const Checkout = (props) => {
  const { userPosition, worker } = props;
  const workerPosition = LocationFormatter.fromApiToGmaps(worker.lokasi);

  let mapRef;

  const handleSubmit = () => {
    const body = {
      pasienLokasi: LocationFormatter.fromMapsToApi(userPosition),
      jarak: worker.jarak.nilai
    };

    Api.postOrder(worker.id, body).then(
      (res) => {
        Toast.show({
          text: res.message,
          duration: 3000
        });
        setTimeout(() => Actions.chat(), 2000);
      },
      (error) => {
        Toast.show({
          text: error.response.data.message,
          duration: 3000
        });
      }
    );
  };

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Pembayaran"
        onPress={() => Actions.pop()}
      />
      <Content>
        <Image
          style={styles.photos}
          source={{ uri: StringBuilder.addBaseURL(worker.foto) }}
        />
        <Text>{`dr. ${worker.nama}`}</Text>
        <Text>{`Harga : ${worker.harga}`}</Text>
        <Text>{`Jarak : ${worker.jarak.teks}`}</Text>
        <View>
          <MapView
            ref={(ref) => {
              mapRef = ref;
            }}
            style={styles.mapView}
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
              })
            }
          >
            <Marker coordinate={userPosition} onMapReady title="Lokasi Kamu" />
            <Marker coordinate={workerPosition} title="Lokasi Nakes" />
          </MapView>
        </View>
        <Text>{`Biaya transportasi : ${worker.biayaTranspor}`}</Text>
        <Text>{`Total : ${worker.biayaTranspor + worker.harga}`}</Text>
      </Content>
      <Footer>
        <Button onPress={handleSubmit}>
          <Text>Order</Text>
        </Button>
      </Footer>
    </Container>
  );
};

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
