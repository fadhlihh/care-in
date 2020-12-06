import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Toast, Container, Form, Button, Text, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import validate from 'validate.js';
import Api from '../../services';
import { UserActions } from '../../redux/actions';
import {
  HeaderFull,
  DatePicker,
  PickerInput,
  TextInput
} from '../../components';
import { LocalStorage, DateFormatter } from '../../helpers';
import styles from './styles';

import schema from './schema';
import { UserType } from '../../constant';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired,
  setUser: PropTypes.func.isRequired
};

const defaultProps = {};

const EditProfile = (props) => {
  const { user, setUser } = props;

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

  const [isLoaded, setIsLoaded] = useState(false);

  const [userType, setUserType] = useState(UserType.PATIENT);

  useEffect(() => {
    LocalStorage.getUserType().then((newUserType) => {
      setUserType(newUserType);
      setIsLoaded(true);
    });
  }, []);

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

    console.log(formState.errors);
    return () => {
      isMounted = false;
    };
  }, [formState.values, userType]);

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
    if (userType === UserType.PATIENT) {
      Api.putUser(user.id, getParsedFormData()).then(
        (res) => {
          Api.getUser(user.id).then(
            (data) => {
              setUser(data.pasien);
              Toast.show({ text: res.message });
              setTimeout(() => Actions.pop(), 1500);
            },
            (e) => {
              Toast.show({ text: e.response.data.message });
            }
          );
        },
        (error) => {
          Toast.show({ text: error.response.data.message });
        }
      );
    } else {
      Api.putWorker(user.id, formState.values).then(
        (res) => {
          const params = {
            params: {
              id: user.id
            }
          };
          Api.getWorker(params).then(
            (data) => {
              setUser(data.nakes[0]);
              Toast.show({ text: res.message });
              setTimeout(() => Actions.pop(), 1500);
            },
            (e) => {
              Toast.show({ text: e.message });
            }
          );
        },
        () => {
          Toast.show({ text: `Tidak terkoneksi dengan internet` });
        }
      );
    }
  };

  const renderErrorUserExist = () =>
    formState.errorUserExist.map((error) => <Text>{error.errors[0]}</Text>);

  return (
    <Container>
      <HeaderFull
        iconNameRight="checkmark-outline"
        iconName="close-outline"
        title="Ubah Profil"
        onLeftPress={Actions.pop}
        onRightPress={handleSubmit}
      />
      <Content showsVerticalScrollIndicator={false} style={styles.container}>
        <Form style={styles.loginForm}>
          {userType === UserType.WORKER && (
            <View>
              <TextInput
                label="Nama Lengkap"
                onChangeText={(newValue) => handleChange('nama', newValue)}
                alertText={hasError('nama') ? formState.errors.nama[0] : null}
                value={formState.values.nama}
              />
              <TextInput
                label="No telepon"
                keyboardType="phone-pad"
                onChangeText={(newValue) => handleChange('noTelp', newValue)}
                alertText={
                  hasError('noTelp') ? formState.errors.noTelp[0] : null
                }
                value={formState.values.noTelp}
              />
              <TextInput
                label="Email"
                keyboardType="email-address"
                onChangeText={(newValue) => handleChange('email', newValue)}
                alertText={hasError('email') ? formState.errors.email[0] : null}
                value={formState.values.email}
              />
            </View>
          )}

          {userType === UserType.PATIENT && isLoaded && (
            <View>
              <TextInput
                label="Nama Lengkap"
                onChangeText={(newValue) => handleChange('nama', newValue)}
                alertText={hasError('nama') ? formState.errors.nama[0] : null}
                value={formState.values.nama}
              />
              <TextInput
                label="Tempat Lahir"
                onChangeText={(newValue) =>
                  handleChange('tempatLahir', newValue)}
                alertText={
                  hasError('tempatLahir')
                    ? formState.errors.tempatLahir[0]
                    : null
                }
                value={formState.values.tempatLahir}
              />
              <DatePicker
                label="Tanggal Lahir"
                onDateChange={(newValue) => handleChange('tglLahir', newValue)}
                placeHolderText={DateFormatter.getLegibleDate(
                  formState.values.tglLahir
                )}
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
                alertText={
                  hasError('noTelp') ? formState.errors.noTelp[0] : null
                }
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
                onChangeText={(newValue) =>
                  handleChange('beratBadan', newValue)}
                alertText={
                  hasError('beratBadan') ? formState.errors.beratBadan[0] : null
                }
                keyboardType="numeric"
                value={formState.values.beratBadan.toString()}
              />
              <TextInput
                label="Tinggi Badan"
                onChangeText={(newValue) =>
                  handleChange('tinggiBadan', newValue)}
                alertText={
                  hasError('tinggiBadan')
                    ? formState.errors.tinggiBadan[0]
                    : null
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
            </View>
          )}

          <View>
            {formState.errorUserExist !== null ? renderErrorUserExist() : null}
          </View>
          {/* <Button
            full
            primary
            onPress={handleSubmit}
            disabled={!formState.isValid}
            style={styles.button_save}
          >
            <Text>Save</Text>
          </Button> */}
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(UserActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
