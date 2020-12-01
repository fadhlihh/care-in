import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container, Content, Form, Button, Text, Toast } from 'native-base';
import { validate } from 'validate.js';
import { Actions } from 'react-native-router-flux';
import {
  Header,
  PickerInput,
  TextInput,
  PairInputText
} from '../../components';
import API from '../../services';
import styles from './styles';
import schema from './schema';
import { DateFormatter } from '../../helpers';

const propTypes = {
  registerData: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const RegisterMedicalHistory = (props) => {
  const { registerData } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      ...registerData,
      goldar: 'ab'
    },
    errors: {},
    touched: {}
  });

  const bloodType = [
    { label: 'AB', value: 'ab' },
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'O', value: 'o' }
  ];

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(() => ({
      ...formState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  const backToRegister = () => {
    Actions.pop();
  };

  const goToLogin = () => {
    Actions.login();
  };

  const handleSubmit = () => {
    API.postRegister(formState.values)
      .then((res) => {
        Toast.show({ text: res.message, duration: 3000 });
        setTimeout(() => goToLogin(), 3000);
      })
      .catch((error) => {
        Toast.show({ text: error.response.data.message, duration: 3000 });
      });
  };

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

  const parseYearToDate = (year) =>
    DateFormatter.getShortDate(new Date(parseInt(year, 10), 1, 1));

  const parsePairInputData = (data) =>
    data.map((item) => {
      return {
        tanggal: parseYearToDate(item.valueOne),
        namaPenyakit: item.valueTwo
      };
    });

  const saveValuesPairInput = (newData) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        riwayatKesehatan: parsePairInputData(newData)
      }
    });
  };

  const handleChange = (name, newValue) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [name]: newValue
      },
      touched: {
        ...formState.touched,
        [name]: true
      }
    });
  };

  return (
    <Container>
      <Header
        iconName="add"
        title="Riwayat Kesehatan"
        onPress={backToRegister}
      />
      <Content style={styles.container}>
        <Form>
          <TextInput
            label="Berat Badan"
            onChangeText={(newValue) => handleChange('beratBadan', newValue)}
            alertText={
              hasError('beratBadan') ? formState.errors.beratBadan[0] : null
            }
            keyboardType="numeric"
          />
          <TextInput
            label="Tinggi Badan"
            onChangeText={(newValue) => handleChange('tinggiBadan', newValue)}
            alertText={
              hasError('tinggiBadan') ? formState.errors.tinggiBadan[0] : null
            }
            keyboardType="numeric"
          />
          <PickerInput
            label="Golongan Darah"
            data={bloodType}
            onValueChange={(newValue) => handleChange('goldar', newValue)}
            selectedValue={formState.values.goldar}
          />
          <PairInputText
            firstLabel="Tahun"
            secondLabel="Nama Penyakit"
            onValueChange={saveValuesPairInput}
          />
          <Button full onPress={handleSubmit} disabled={!formState.isValid}>
            <Text>Submit</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

RegisterMedicalHistory.propTypes = propTypes;
RegisterMedicalHistory.defaultProps = defaultProps;

export default RegisterMedicalHistory;
