import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Container, Form, Icon, Button, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import {
  Header,
  DatePicker,
  PickerInput,
  TextInput
} from '../../../../components';
import styles from './Styles';
import schema from './schema';

const propTypes = {
  stepOneValues: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const Register = (props) => {
  const { stepOneValues } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      jk: 'l'
    },
    errors: {},
    touched: {},
    errorUserExist: null
  });

  useEffect(() => {
    const validateData = () => {
      const errors = validate(formState.values, schema);

      setFormState(() => ({
        ...formState,
        isValid: !errors,
        errors: errors || {}
      }));
    };

    validateData();
  }, [formState.values]);

  const genderData = [
    { label: 'Laki-Laki', value: 'l' },
    { label: 'Perempuan', value: 'p' }
  ];

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

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
        iconName="chevron-back-outline"
        title="Pendaftaran"
        onPress={() => Actions.pop()}
      />
      <Content>
        <View style={styles.container}>
          <View>
            <Form style={styles.loginForm}>
              <TextInput
                label="Nama Lengkap"
                onChangeText={(newValue) => handleChange('nama', newValue)}
                alertText={hasError('nama') ? formState.errors.nama[0] : null}
              />
              <TextInput
                label="Tempat Lahir"
                onChangeText={(newValue) =>
                  handleChange('tempatLahir', newValue)
                }
                alertText={
                  hasError('tempatLahir')
                    ? formState.errors.tempatLahir[0]
                    : null
                }
              />
              <DatePicker
                label="Tanggal Lahir"
                onDateChange={(newValue) => handleChange('tglLahir', newValue)}
              />
              <PickerInput
                label="Jenis Kelamin"
                data={genderData}
                onValueChange={(newValue) => handleChange('jk', newValue)}
                selectedValue={formState.values.jk}
              />
            </Form>
            <View style={styles.btnBundle}>
              <Button
                iconRight
                style={styles.button}
                full
                onPress={() =>
                  Actions.registerStepThree({
                    stepTwoValues: { ...stepOneValues, ...formState.values }
                  })
                }
                disabled={!formState.isValid}
              >
                <Icon name="arrow-forward" style={styles.icon} />
              </Button>
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
