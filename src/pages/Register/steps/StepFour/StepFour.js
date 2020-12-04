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
import PropTypes from 'prop-types';
import validate from 'validate.js';
import API from '../../../../services';
import {
  Header,
  DatePicker,
  PairInputText,
  TextInput
} from '../../../../components';
import styles from './styles';
import { DateFormatter } from '../../../../helpers';
import schema from './schema';

const propTypes = {
  stepThreeValues: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const Register = (props) => {
  const { stepThreeValues } = props;

  const [formState, setFormState] = useState({
    isValid: true,
    values: {
      riwayatKesehatan: []
    },
    errors: {},
    touched: {},
    errorUserExist: null
  });

  useEffect(() => {
    console.log(formState.values);
  }, [formState.values]);

  const getParsedFormData = (data) => {
    return {
      ...data,
      tglLahir: DateFormatter.getShortDate(data.tglLahir)
    };
  };

  const parseYearToDate = (year) =>
    DateFormatter.getShortDate(new Date(parseInt(year, 10), 0, 1));

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

  const handleSubmit = () => {
    const body = { ...stepThreeValues, ...formState.values };

    console.log(getParsedFormData(body));
    API.postRegister(body).then(
      (res) => {
        Toast.show({ text: res.message, duration: 3000 });
        setTimeout(Actions.login(), 3000);
      },
      (error) => {
        Toast.show({
          text: error.response.data.message,
          duration: 3000
        });
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
        <View />
        <Form style={styles.loginForm}>
          <Text style={styles.textHeading}>
            {`Tambahkan \nRiwayat Penyakit`}
          </Text>

          <PairInputText
            firstLabel="Tahun"
            secondLabel="Nama Penyakit"
            onValueChange={saveValuesPairInput}
          />
        </Form>
        <View style={styles.btnBundle}>
          <Button
            iconRight
            style={styles.button}
            full
            onPress={() => handleSubmit()}
          >
            <Icon name="arrow-forward" style={styles.icon} />
          </Button>
        </View>
      </Content>
    </Container>
  );
};

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;

export default Register;
