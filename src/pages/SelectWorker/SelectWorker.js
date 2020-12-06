import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Toast, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import { COST_ADMIN } from 'react-native-dotenv';
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
          price={item.harga * COST_ADMIN}
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
      <View style={styles.nothingDefault}>
        <View>
          <Text style={styles.textNothingDefault}>
            {`Tenaga kesehatan \n tidak ada yang tersedia`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title={`Pilih ${StringBuilder.capitalizeLetter(workerType)}`}
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
