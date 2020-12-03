import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Toast, Container, Form, Button, Text, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import validate from 'validate.js';
import API from '../../services';
import { Header, DatePicker, PickerInput, TextInput } from '../../components';
import styles from './styles';
import { DateFormatter } from '../../helpers';
import schema from './schema';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const EditProfile = (props) => {
  const { user } = props;

  const bloodType = [
    { label: 'AB', value: 'ab' },
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
    { label: 'O', value: 'o' }
  ];

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      ...user,
      tglLahir: new Date(user.tglLahir)
    },
    errors: {},
    touched: {},
    errorUserExist: null
  });

  useEffect(() => {
    let isMounted = true;

    const validateData = () => {
      const errors = validate(formState.values, schema);

      setFormState(() => ({
        ...formState,
        isValid: !errors,
        errors: errors || {}
      }));
    };

    if (isMounted) {
      validateData();
    }

    return () => {
      isMounted = false;
    };
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
    console.log(formState.values);
    // fetch API and update redux store
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
        title="Ubah profil"
        onPress={() => Actions.pop()}
      />
      <Content style={styles.container}>
        <Form style={styles.loginForm}>
          <TextInput
            label="Nama Lengkap"
            onChangeText={(newValue) => handleChange('nama', newValue)}
            alertText={hasError('nama') ? formState.errors.nama[0] : null}
            value={formState.values.nama}
          />
          <TextInput
            label="Tempat Lahir"
            onChangeText={(newValue) => handleChange('tempatLahir', newValue)}
            alertText={
              hasError('tempatLahir') ? formState.errors.tempatLahir[0] : null
            }
            value={formState.values.tempatLahir}
          />
          <DatePicker
            label="Tanggal Lahir"
            onDateChange={(newValue) => handleChange('tglLahir', newValue)}
            placeHolderText={DateFormatter.getLegibleDate(formState.values.tglLahir)}
          />
          <PickerInput
            label="Jenis Kelamin"
            data={genderData}
            onValueChange={(newValue) => handleChange('jk', newValue)}
            selectedValue={formState.values.jk}
          />
          <TextInput
            label="No telepon"
            keyboardType="phone-pad"
            onChangeText={(newValue) => handleChange('noTelp', newValue)}
            alertText={hasError('noTelp') ? formState.errors.noTelp[0] : null}
            value={formState.values.noTelp}
          />
          <TextInput
            label="Email"
            keyboardType="email-address"
            onChangeText={(newValue) => handleChange('email', newValue)}
            alertText={hasError('email') ? formState.errors.email[0] : null}
            value={formState.values.email}
          />
          <TextInput
            label="Berat Badan"
            onChangeText={(newValue) => handleChange('beratBadan', newValue)}
            alertText={
              hasError('beratBadan') ? formState.errors.beratBadan[0] : null
            }
            keyboardType="numeric"
            value={formState.values.beratBadan.toString()}
          />
          <TextInput
            label="Tinggi Badan"
            onChangeText={(newValue) => handleChange('tinggiBadan', newValue)}
            alertText={
              hasError('tinggiBadan') ? formState.errors.tinggiBadan[0] : null
            }
            keyboardType="numeric"
            value={formState.values.tinggiBadan.toString()}
          />
          <PickerInput
            label="Golongan Darah"
            data={bloodType}
            onValueChange={(newValue) => handleChange('goldar', newValue)}
            selectedValue={formState.values.goldar}
          />
          <View>
            {formState.errorUserExist !== null ? renderErrorUserExist() : null}
          </View>
          <Button full onPress={handleSubmit} disabled={!formState.isValid}>
            <Text>Save</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

EditProfile.propTypes = propTypes;
EditProfile.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(EditProfile);
