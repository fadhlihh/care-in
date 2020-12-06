import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { Container, Text, Toast, Content, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Api from '../../services';
import { InputModal, CardMedicalHistory } from './components';
import { Header } from '../../components';
import { DateFormatter } from '../../helpers';
import styles from './styles';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const MedicalHistory = (props) => {
  const { user } = props;

  const [state, setState] = useState({
    medicalHistory: [],
    isLoaded: false,
    newValues: { namaPenyakit: '', tanggal: '' },
    isFabShown: true,
    reload: false
  });

  let addBottomSheet;
  let editBottomSheet;

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      const params = {
        params: {
          limit: 100,
          page: 1
        }
      };

      Api.getMedicalHitory(user.id, params).then(
        (res) => {
          setState({
            ...state,
            medicalHistory: res.riwayatKesehatan,
            isLoaded: true
          });
        },
        (error) => {
          setState({ ...state, isLoaded: true });
          Toast.show({ text: error.response.data.message });
        }
      );
    };

    fetchMedicalHistory();
  }, [state.reload]);

  useEffect(() => {
    console.log(state.newValues);
  }, [state]);

  const handleAddMedicalHistory = () => {
    const body = {
      namaPenyakit: state.newValues.namaPenyakit,
      tanggal: state.newValues.tanggal
    };

    Api.postMedicalHistory(user.id, body).then(
      () => {
        setState({
          ...state,
          medicalHistory: [body, ...state.medicalHistory]
        });
        Toast.show({
          text: 'Riwayat kesehatan berhasil ditambahkan'
        });
      },
      (error) => {
        Toast.show({
          text: `Telah terjadi error: ${error.response.data.message}`
        });
        addBottomSheet.close();
      }
    );
  };

  const handleEditMedicalHistory = () => {
    const body = {
      namaPenyakit: state.newValues.namaPenyakit,
      tanggal: state.newValues.tanggal
    };

    Api.putMedicalHistory(state.newValues.id, body).then(
      () => {
        setState({
          ...state,
          reload: !state.reload
        });
        Toast.show({
          text: 'Riwayat kesehatan berhasil diubah'
        });
      },
      (error) => {
        Toast.show({
          text: `Telah terjadi error: ${error.response.data.message}`
        });
        editBottomSheet.close();
      }
    );
  };

  const handleDelete = () => {
    Api.deleteMedicalHistory(state.newValues.id).then(
      () => {
        setState({
          ...state,
          reload: !state.reload
        });
        Toast.show({
          text: 'Riwayat kesehatan berhasil dihapus'
        });
      },
      (error) => {
        Toast.show({
          text: `Telah terjadi error: ${error.response.data.message}`
        });
        editBottomSheet.close();
      }
    );
  };

  const handleFabPress = () => {
    setState({ ...state, newValues: { namaPenyakit: '', tanggal: '' } });
    addBottomSheet.open();
  };

  const handleEditButtonPress = (index) => {
    setState({ ...state, newValues: state.medicalHistory[index] });
    editBottomSheet.open();
  };

  const handleChange = (name, value) => {
    setState({
      ...state,
      newValues: {
        ...state.newValues,
        [name]: value
      }
    });
  };

  const renderCardMedicalHistory = () => {
    if (state.medicalHistory.length !== 0) {
      return state.medicalHistory.map((item, index) => (
        <CardMedicalHistory
          key={index}
          name={item.namaPenyakit}
          date={DateFormatter.getLegibleDate(item.tanggal)}
          onPress={() => handleEditButtonPress(index)}
        />
      ));
    }
    return <Text>Tidak ada riwayat kesehatan</Text>;
  };

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Riwayat Kesehatan"
        onPress={() => Actions.pop()}
      />
      <Content  showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {!state.isLoaded ? <ActivityIndicator /> : renderCardMedicalHistory()}
      </Content>
      <Button onPress={handleFabPress} style={styles.fab}>
        <Icon name="add-outline" />
      </Button>
      <InputModal
        refs={(ref) => {
          addBottomSheet = ref;
        }}
        onDateChange={(value) =>
          handleChange('tanggal', DateFormatter.getShortDate(value))}
        onDiseaseChange={(value) => handleChange('namaPenyakit', value)}
        onPressSaveButton={handleAddMedicalHistory}
        onPressCancelButton={() => addBottomSheet.close()}
        valueDisease={state.newValues.namaPenyakit}
        valueDate={DateFormatter.getLegibleDate(
          new Date(state.newValues.tanggal)
        )}
      />
      <InputModal
        refs={(ref) => {
          editBottomSheet = ref;
        }}
        onDateChange={(value) =>
          handleChange('tanggal', DateFormatter.getShortDate(value))}
        onDiseaseChange={(value) => handleChange('namaPenyakit', value)}
        onPressSaveButton={handleEditMedicalHistory}
        onPressCancelButton={() => editBottomSheet.close()}
        onPressDeleteButton={handleDelete}
        valueDisease={state.newValues.namaPenyakit}
        valueDate={DateFormatter.getLegibleDate(
          new Date(state.newValues.tanggal)
        )}
        edit
      />
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
