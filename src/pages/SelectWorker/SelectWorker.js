import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import { CardWorker } from './components';
import { Header } from '../../components';
import styles from './styles';

const propTypes = {
  token: PropTypes.string.isRequired
};

const defaultProps = {};

const mockData = [
  {
    name: 'dr. Lucy Purnama',
    photoSource: 'https://reactnative.dev/img/tiny_logo.png',
    price: 100000,
    distance: 1.4
  },
  {
    name: 'dr. Lucy Purnama',
    photoSource: 'https://reactnative.dev/img/tiny_logo.png',
    price: 100000,
    distance: 1.4
  },
  {
    name: 'dr. Lucy Purnama',
    photoSource: 'https://reactnative.dev/img/tiny_logo.png',
    price: 100000,
    distance: 1.4
  },
  {
    name: 'dr. Lucy Purnama',
    photoSource: 'https://reactnative.dev/img/tiny_logo.png',
    price: 100000,
    distance: 1.4
  },
  {
    name: 'dr. Lucy Purnama',
    photoSource: 'https://reactnative.dev/img/tiny_logo.png',
    price: 100000,
    distance: 1.4
  },
  {
    name: 'dr. Lucy Purnama',
    photoSource: 'https://reactnative.dev/img/tiny_logo.png',
    price: 100000,
    distance: 1.4
  },
  {
    name: 'dr. Lucy Purnama',
    photoSource: 'https://reactnative.dev/img/tiny_logo.png',
    price: 100000,
    distance: 1.4
  }
];

const SelectWorker = (props) => {
  const { token } = props;

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  });

  const backToHome = () => {
    Actions.pop();
  };

  const goToCheckout = (id) => {
    Actions.checkout(id);
  };

  return (
    <Container>
      <Header iconName="back" title="Pilih Dokter" onPress={backToHome} />
      <Content style={styles.cardContainer}>
        {mockData.map((element, index) => (
          <CardWorker
            key={index}
            name={element.name}
            photoSource={{ uri: element.photoSource }}
            price={element.price}
            distance={element.distance}
            onPress={() => goToCheckout(123)}
          />
        ))}
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
