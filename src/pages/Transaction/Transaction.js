import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Container, Content, Toast, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../components';
import { CardTransaction } from './components';
import Api from '../../services';
import { LocalStorage, StringBuilder, DateFormatter } from '../../helpers';
import { UserType } from '../../constant';
import styles from './styles';

const propTypes = {};

const defaultProps = {};

const Transaction = () => {
  const [state, setState] = useState({
    transactionHistory: [],
    activeTransaction: {},
    isLoaded: false,
    transactionStatus: 'no-transaction',
    userType: UserType.PATIENT
  });

  useEffect(() => {
    const fetchTransaction = async (userType) => {
      const params = {
        params: {
          limit: 5,
          page: 1
        }
      };

      if (userType === UserType.PATIENT) {
        Api.getTransaction(params).then(
          (res) => {
            if (res.transaksiBerjalan !== undefined) {
              Api.getWorker({
                params: { id: res.transaksiBerjalan.nakesId }
              }).then((response) => {
                setState({
                  ...state,
                  activeTransaction: {
                    ...res.transaksiBerjalan,
                    worker: response.nakes[0]
                  },
                  transactionStatus: 'active',
                  isLoaded: true
                });
              });
            } else if (res.riwayatTransaksi.length !== 0) {
              setState({
                ...state,
                transactionHistory: res.riwayatTransaksi,
                transactionStatus: 'inactive',
                isLoaded: true
              });
            }
          },
          (error) => {
            Toast.show({ text: error.response.data.message });
          }
        );
      } else {
        Api.getTransactionWorker(params).then(
          (res) => {
            if (res.riwayatTransaksi.length !== 0) {
              setState({
                ...state,
                transactionHistory: res.riwayatTransaksi,
                transactionStatus: 'inactive',
                isLoaded: true,
                userType
              });
            } else {
              setState({
                ...state,
                userType
              });
            }
          },
          (error) => {
            Toast.show({ text: error.response.data.message });
          }
        );
      }
    };

    const setUserType = async () => {
      const userType = await LocalStorage.getUserType();
      setState({
        ...state,
        userType
      });
      console.log('user setted ', userType);
      return userType;
    };

    setUserType().then((userType) => fetchTransaction(userType));
    console.log(state);
  }, []);

  const renderTransactionCard = () => {
    const cardList = [];

    state.transactionHistory.forEach((item) =>
      cardList.push(
        <CardTransaction
          key={item.id}
          name={
            state.userType === UserType.PATIENT
              ? item.nakes.nama
              : item.pasien.nama
          }
          photoSource={{
            uri: StringBuilder.addBaseURL(item.nakes.foto)
          }}
          status={item.berhasil}
          cost={item.totalBiaya + item.biayaAdmin}
          costDetail={{
            biayaAdmin: item.biayaAdmin,
            biayaJasa: item.biayaJasa,
            biayaTranspor: item.biayaTranspor
          }}
          date={DateFormatter.getLegibleDate(item.waktuDibuat)}
          worker={state.userType === UserType.WORKER}
        />
      )
    );

    return cardList;
  };

  const renderContent = () => {
    if (
      state.transactionStatus === 'no-transaction' ||
      (state.transactionStatus === 'active' &&
        state.transactionHistory.length === 0)
    ) {
      return (
        <View style={styles.nothingDefault}>
          <View>
            <Text style={styles.textNothingDefault}>
              {`Kamu belum pernah \n memesan tenaga kesehatan`}
            </Text>
          </View>
        </View>
      );
    }
    return renderTransactionCard();
  };

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Riwayat Transaksi"
        onPress={() => Actions.pop()}
      />
      <Content>
        {!state.isLoaded ? <ActivityIndicator /> : renderContent()}
      </Content>
    </Container>
  );
};

Transaction.propTypes = propTypes;
Transaction.defaultProps = defaultProps;

export default Transaction;
