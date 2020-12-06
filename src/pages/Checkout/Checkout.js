import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Thumbnail,
  Text,
  Button,
  View,
  Toast
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import MapView, { Marker } from 'react-native-maps';
import { COST_ADMIN } from 'react-native-dotenv';
import { Header } from '../../components';
import styles from './styles';
import { LocationFormatter, StringBuilder } from '../../helpers';
import Api from '../../services';
import { CloudMessaging } from '../../services/Firebase';
import { NotificationType } from '../../constant';

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
        const data = {
          data: {
            type: NotificationType.NEW_ORDER
          },
          userId: worker.id,
          title: 'Anda mendapat pesanan!',
          body: 'Cek aplikasi untuk menerima pesanan'
        };
        CloudMessaging.sendNotification(data);

        Toast.show({
          text: res.message,
          duration: 3000
        });
        setTimeout(() => Actions.home(), 2000);
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
              })}
          >
            <Marker coordinate={userPosition} onMapReady title="Lokasi Kamu" />
            <Marker coordinate={workerPosition} title="Lokasi Nakes" />
          </MapView>
        </View>

        <View style={styles.root}>
          <View style={styles.cardProfil}>
            <View>
              <Thumbnail
                source={{ uri: StringBuilder.addBaseURL(worker.foto) }}
                style={styles.img}
              />
            </View>
            <View style={styles.subCardProfil}>
              <Text style={styles.textProfil}>{`${worker.nama}`}</Text>
              <Text style={styles.doneProfil}>{`${worker.jarak.teks}`}</Text>
            </View>
          </View>
          <Text style={styles.textSubHeading}>Detail Pembayaran</Text>
          <View>
            <View style={styles.detailCheckOut}>
              <Text style={styles.titleCheckOut}>Jasa</Text>
              <Text style={styles.titleCheckOut}>
                {`${StringBuilder.formatCurrency(worker.harga * COST_ADMIN)}`}
              </Text>
            </View>
            <View style={styles.detailCheckOut}>
              <Text style={styles.titleCheckOut}>Biaya Transportasi</Text>
              <Text style={styles.titleCheckOut}>
                {`${StringBuilder.formatCurrency(worker.biayaTranspor)}`}
              </Text>
            </View>
            <View style={styles.detailCheckOut}>
              <Text style={styles.totalCheckOut}>Total Pembayaran</Text>
              <Text style={styles.totalCheckOut}>
                {StringBuilder.formatCurrency(
                  worker.harga * COST_ADMIN + worker.biayaTranspor
                )}
              </Text>
            </View>
          </View>
          <View>
            <Button
              full
              primary
              onPress={handleSubmit}
              style={styles.button_save}
            >
              <Text>
                <Text style={styles.text}>Pesan</Text>
              </Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

Checkout.propTypes = propTypes;
Checkout.defaultProps = defaultProps;

export default Checkout;
