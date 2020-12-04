import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content, Toast, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../components';
import { CardTransaction } from './components';
import Api from '../../services';
import { StringBuilder } from '../../helpers';
import mockData from './mockData';

const propTypes = {};

const defaultProps = {};

const Transaction = () => {
  const [state, setState] = useState({
    transactionHistory: [],
    activeTransaction: {},
    isLoaded: false,
    transactionStatus: 'no-transaction'
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      const params = {
        params: {
          limit: 5,
          page: 1
        }
      };

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
    };

    fetchTransaction();
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
          status={state.activeTransaction.status}
          date={state.activeTransaction.waktuDibuat}
          onPress={() => Actions.chat()}
        />
      );
    }

    state.transactionHistory.forEach((item) =>
      cardList.push(
        <CardTransaction
          name="History"
          photoSource={{
            // uri: StringBuilder.addBaseURL(state.activeTransaction.worker.foto)
            uri: 'https://reactnative.dev/img/tiny_logo.png'
          }}
          status="selesai"
          date={item.waktuDibuat}
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
