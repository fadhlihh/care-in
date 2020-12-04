import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  Toast,
  Container,
  Form,
  Icon,
  Button,
  Text,
  Content,
  Right
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import validate from 'validate.js';
import API from '../../../../services';
import { Header, DatePicker, PickerInput, TextInput } from '../../../../components';
import styles from './Styles';
import { DateFormatter } from '../../../../helpers';
import schema from './schema';
import TambahPenyakit from './components';

const Register = () => {
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

  const getParsedFormData = () => {
    return {
      ...formState.values,
      tglLahir: DateFormatter.getShortDate(formState.values.tglLahir)
    };
  };

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

  const handleSubmit = () => {
    API.postCheckRegister(getParsedFormData())
      .then(() => {
        Actions.registerMedicalHistory({ registerData: getParsedFormData() });
      })
      .catch((error) => {
        setFormState({
          ...formState,
          errorUserExist: error.response.data.constraints
        });
        Toast.show({
          text: error.response.data.message,
          duration: 3000
        });
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
        <View>
        
        </View>
        <Form style={styles.loginForm}>

        <Text style={styles.textHeading}>{`Tambahkan \nRiwayat Penyakit`}</Text>

          <View style={styles.input}>
            <View style={styles.tahunInput}>
              <TextInput 
                label="Tahun"
                keyboardType="phone-pad"
                onChangeText={(newValue) => handleChange('tahun', newValue)}
                alertText={hasError('tahun') ? formState.errors.noTelp[0] : null}
              />
              </View> 
              <View style={styles.penyakitInput}>
                <TextInput
                  label="Penyakit"
                  onChangeText={(newValue) => handleChange('penyakit', newValue)}
                  alertText={
                    hasError('penyakit') ? formState.errors.username[0] : null
                  }
                />
            </View> 
          </View>
          
          <View style={styles.option}>
            <Button rounded style={styles.btnTrash}>
              <Icon name='trash-outline' style={styles.iconTrash}  />
            </Button>
            <Button rounded style={styles.btnAdd}>
              <Icon name='add-outline' style={styles.iconAdd}  />
            </Button>
          </View>

          <View>
            {formState.errorUserExist !== null ? renderErrorUserExist() : null}
          </View>
        </Form>
        <View style={styles.btnBundle}>
          <Button
            iconRight
            style={styles.button}
            full
            onPress={() => Actions.registerStepFour()}
            // disabled={!formState.isValid}
          >
            <Icon
              name="arrow-forward"
              style={styles.icon}
            />
          </Button>
        </View>
      </Content>
    </Container>
  );
};

export default Register;
