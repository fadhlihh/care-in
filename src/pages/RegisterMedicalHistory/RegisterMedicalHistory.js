import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Button, Text } from 'native-base';
import { validate } from 'validate.js';
import { Actions } from 'react-native-router-flux';
import { PickerInput, TextInput, PairInputText } from '../../component';
import API from '../../services';
import styles from './styles';
import schema from './schema';
import { getShortDate } from '../../util';

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
    console.log(formState.values);
    console.log(formState.errors);
    const errors = validate(formState.values, schema);

    setFormState(() => ({
      ...formState,
      isValid: !errors,
      errors: errors || {}
    }));
  }, [formState.values]);

  const goToLogin = () => {
    // Actions.login();
  };

  const postDataToAPI = () => {
    const data = {};

    API.postRegister(data).then((res) => {
      console.log('==================================', res);
    });
  };

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

  const parseYearToDate = (year) =>
    getShortDate(new Date(parseInt(year, 10), 0, 1));

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
    <ScrollView style={styles.container}>
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
        <Button full onPress={goToLogin}>
          <Text>Submit</Text>
        </Button>
      </Form>
    </ScrollView>
  );
};

RegisterMedicalHistory.defaultProps = defaultProps;

export default RegisterMedicalHistory;
