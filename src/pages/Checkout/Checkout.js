import React from 'react';
import { Image } from 'react-native';
import { Container, Content, Text, Footer, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Header } from '../../component';
import styles from './styles';

const propTypes = {};

const defaultProps = {};

const mockData = {
  name: 'dr. Lucy Purnama',
  photoSource: 'https://reactnative.dev/img/tiny_logo.png',
  price: 100000,
  distance: 4,
  transportCost: 8000,
  totalPrice: 108000
};

const Checkout = (props) => {
  const { user } = props;

  let mapRef;

  const backToSelectWorker = () => {
    Actions.pop();
  };

  return (
    <Container>
      <Header iconName="back" title="Pembayaran" onPress={backToSelectWorker} />
      <Content>
        <Image style={styles.photos} source={{ uri: mockData.photoSource }} />
        <Text>{mockData.name}</Text>
        <Text>{`Harga : ${mockData.price}`}</Text>
        <Text>{`Jarak : ${mockData.distance}`}</Text>
        <View>
          <Text>See in maps</Text>
          <MapView
            ref={(ref) => (mapRef = ref)}
            style={styles.mapView}
            region={{
              latitude: -6.903215015081733,
              longitude: 107.68519169510188,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15
            }}
            onLayout={() =>
              mapRef.fitToCoordinates(
                [
                  {
                    latitude: -6.859215014081723,
                    longitude: 107.68519169512188
                  },
                  {
                    latitude: -6.873215015081723,
                    longitude: 107.68519169510188
                  },
                  {
                    latitude: -6.903215015081723,
                    longitude: 107.68519169510188
                  }
                ],
                {
                  edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                  animated: true
                }
              )}
          >
            <Marker
              coordinate={{
                latitude: -6.903215015081723,
                longitude: 107.68519169510188
              }}
              onMapReady
              title="User position"
            />
            <Marker
              coordinate={{
                latitude: -6.859215014081723,
                longitude: 107.68519169512188
              }}
              title="Worker position"
            />
            <Polyline
              coordinates={[
                { latitude: -6.859215014081723, longitude: 107.68519169512188 },
                {
                  latitude: -6.873015015081723,
                  longitude: 107.66519169510188
                },
                {
                  latitude: -6.903215015081723,
                  longitude: 107.68519169510188
                }
              ]}
              strokeWidth={6}
              strokeColor="red"
            />
          </MapView>
        </View>
        <Text>{`Total : ${mockData.totalPrice}`}</Text>
      </Content>
      <Footer>
        <Button>
          <Text>Order</Text>
        </Button>
      </Footer>
    </Container>
  );
};

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
