import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Geolocation from '@react-native-community/geolocation';
import { connect } from 'react-redux';
import Api from '../../services';
import { CardMedicalHistory } from './components';
import { Header } from '../../components';
import { DateFormatter } from '../../helpers';
import styles from './styles';
import mockData from './mockData';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const MedicalHistory = (props) => {
  const { user } = props;

  const [state, setState] = useState({ medicalHistory: [] });

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      const params = {
        params: {
          limit: 0,
          page: 0
        }
      };

      Api.getMedicalHitory(user.id, params).then(
        (res) => {
          setState({ medicalHistory: res.riwayatKesehatan });
        },
        (error) => {
          Toast.show({ text: error.message });
        }
      );
    };

    fetchMedicalHistory();
  }, []);

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Riwayat Kesehatan"
        onPress={() => Actions.pop()}
      />
      <Content style={styles.cardContainer}>
        {state.medicalHistory.map((item, index) => (
          <CardMedicalHistory
            key={index}
            name={item.namaPenyakit}
            date={DateFormatter.getLegibleDate(item.tanggal)}
          />
        ))}
      </Content>
    </Container>
  );
};

MedicalHistory.propTypes = propTypes;
MedicalHistory.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(MedicalHistory);
