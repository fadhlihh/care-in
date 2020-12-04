import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity } from 'react-native';
import { Container, Text, Card, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Api from '../../services';
import { CardMedicalHistory } from './components';
import { Header } from '../../components';
import { DateFormatter } from '../../helpers';
import styles from './styles';

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
          Toast.show({ text: error.response.data.message });
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
      <Card>
        {state.medicalHistory.map((item, index) => (
          <CardMedicalHistory
            key={index}
            name={item.namaPenyakit}
            date={DateFormatter.getLegibleDate(item.tanggal)}
          />
        ))}
      </Card>
      <View style={styles.container}>
        <View style={styles.fab}>
          <TouchableOpacity>
            <View style={styles.containt}>
              <View style={{ paddingLeft: '30%' }}>
                <Text style={styles.textContaint}>+</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
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
