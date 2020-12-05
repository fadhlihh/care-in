import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content, Toast, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../components';
import { CardTransaction } from './components';
import Api from '../../services';
import { LocalStorage, StringBuilder, DateFormatter } from '../../helpers';
import { UserType } from '../../constant';

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
  }, []);

  const renderTransactionCard = () => {
    const cardList = [];

    if (state.transactionStatus === 'active') {
      cardList.push(
        <CardTransaction
          name={state.activeTransaction.worker.nama}
          photoSource={{
            uri: StringBuilder.addBaseURL(state.activeTransaction.worker.foto)
          }}
          status={state.activeTransaction.sakit}
          onPress={() => Actions.chat()}
        />
      );
    }

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
          status={item.sakit}
          cost={item.totalBiaya}
          date={DateFormatter.getLegibleDate(item.waktuDibuat)}
          worker={state.userType === UserType.PATIENT}
        />
      )
    );

    return cardList;
  };

  const renderContent = () => {
    if (state.transactionStatus === 'no-transaction') {
      return <Text>Kamu belum pernah memesan tenaga kesehatan</Text>;
    }
    return renderTransactionCard();
  };

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Riwayat"
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
