import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Form, Button, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { PickerInput, TextInput, PairInputText } from '../../component';
import styles from './styles';

const propTypes = {
  registerData: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const RegisterMedicalHistory = (props) => {
  const { registerData } = props;

  const [formState, setFormState] = useState({
    registerData,
    values: {}
  });

  const bloodType = [
    { label: 'AB', value: 'ab' },
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'O', value: 'o' }
  ];

  const goToLogin = () => {
    Actions.login();
  };

  const handleChange = (name, newValue) => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [name]: newValue
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Form>
        <TextInput
          label="Berat Badan"
          onChangeText={(newValue) => handleChange('weight', newValue)}
        />
        <TextInput
          label="Tinggi Badan"
          onChangeText={(newValue) => handleChange('height', newValue)}
        />
        <PickerInput label="Golongan Darah" data={bloodType} />
        <PairInputText firstLabel="Tahun" secondLabel="Nama Penyakit" />
        <Button full onPress={goToLogin}>
          <Text>Submit</Text>
        </Button>
      </Form>
    </ScrollView>
  );
};

RegisterMedicalHistory.propTypes = propTypes;
RegisterMedicalHistory.defaultProps = defaultProps;

export default RegisterMedicalHistory;
