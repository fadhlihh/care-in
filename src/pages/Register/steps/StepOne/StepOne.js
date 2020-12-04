import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Toast, Container, Form, Icon, Button, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import validate from 'validate.js';
import Api from '../../../../services';
import { Header, TextInput } from '../../../../components';
import styles from './Styles';
import schema from './schema';
import dummyData from './dummyData';

const Register = () => {
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
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

  const handleSubmit = () => {
    const body = {
      ...dummyData,
      ...formState.values
    };

    Api.postCheckRegister(body).then(
      () => {
        Actions.registerStepTwo({ stepOneValues: formState.values });
      },
      (error) => {
        Toast.show({ text: error.response.data.message });
      }
    );
  };

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
            label="Username"
            onChangeText={(newValue) => handleChange('username', newValue)}
            alertText={
              hasError('username') ? formState.errors.username[0] : null
            }
          />
          <TextInput
            label="Email"
            keyboardType="email-address"
            onChangeText={(newValue) => handleChange('email', newValue)}
            alertText={hasError('email') ? formState.errors.email[0] : null}
          />
          <TextInput
            label="No telepon"
            keyboardType="phone-pad"
            onChangeText={(newValue) => handleChange('noTelp', newValue)}
            alertText={hasError('noTelp') ? formState.errors.noTelp[0] : null}
          />
          <TextInput
            label="Password"
            secureTextEntry
            onChangeText={(newValue) => handleChange('password', newValue)}
            alertText={
              hasError('password') ? formState.errors.password[0] : null
            }
          />
          <TextInput
            label="Confirm Password"
            secureTextEntry
            onChangeText={(newValue) =>
              handleChange('confirmPassword', newValue)}
            alertText={
              hasError('confirmPassword')
                ? formState.errors.confirmPassword[0]
                : null
            }
          />
        </Form>
        <View style={styles.btnBundle}>
          <View>
            <Button
              iconRight
              style={styles.button}
              full
              onPress={handleSubmit}
              disabled={!formState.isValid}
            >
              <Icon name="arrow-forward" style={styles.icon} />
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default Register;
