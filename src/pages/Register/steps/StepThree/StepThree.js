import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Toast,
  Container,
  Form,
  Icon,
  Button,
  Text,
  Content
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import { BloodType } from '../../../../constant';
import { Header, TextInput, PickerInput } from '../../../../components';
import styles from './Styles';
import { DateFormatter } from '../../../../helpers';
import schema from './schema';

const propTypes = {
  stepTwoValues: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const Register = (props) => {
  const { stepTwoValues } = props;

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      goldar: 'ab'
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

  const renderErrorUserExist = () =>
    formState.errorUserExist.map((error) => <Text>{error.errors[0]}</Text>);

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Pendaftaran"
        onPress={() => Actions.pop()}
      />
      <Content style={styles.container}>
        <Form style={styles.loginForm}>
          <TextInput
            label="Berat Badan"
            keyboardType="numeric"
            onChangeText={(newValue) => handleChange('beratBadan', newValue)}
            alertText={
              hasError('beratBadan') ? formState.errors.beratBadan[0] : null
            }
          />
          <TextInput
            label="Tinggi Badan"
            keyboardType="numeric"
            onChangeText={(newValue) => handleChange('tinggiBadan', newValue)}
            alertText={
              hasError('email') ? formState.errors.tinggiBadan[0] : null
            }
          />

          <PickerInput
            label="Golongan Darah"
            data={BloodType}
            onValueChange={(newValue) => handleChange('goldar', newValue)}
            selectedValue={formState.values.goldar}
          />

          <View>
            {formState.errorUserExist !== null ? renderErrorUserExist() : null}
          </View>
          <View style={styles.btnBundle}>
            <Button
              iconRight
              style={styles.button}
              full
              onPress={() =>
                Actions.registerStepFour({
                  stepThreeValues: { ...stepTwoValues, ...formState.values }
                })
              }
              // disabled={!formState.isValid}
            >
              <Icon name="arrow-forward" style={styles.icon} />
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
};

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
