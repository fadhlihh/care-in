import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Container, Content, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Header } from '../../components';
import { CardTransaction } from './components';
import Api from '../../services';
import mockData from './mockData';
import { StringBuilder } from '../../helpers';

const propTypes = {};

const defaultProps = {};

const History = () => {
  const [state, setState] = useState({
    history: [],
    activeTransaction: {},
    isLoaded: false
  });

  useEffect(() => {
    const fetchTransaction = async () => {
      const params = {
        params: {
          limit: 5,
          page: 1
        }
      };

      Api.getTransaction(params)
        .then(
          (res) => {
            return res.transaksiBerjalan;
          },
          (error) => {
            Toast.show({ text: error.message });
          }
        )
        .then((activeTransaction) => {
          Api.getWorker({ params: { id: activeTransaction.nakesId } }).then(
            (res) => {
              setState({
                ...state,
                activeTransaction: {
                  ...activeTransaction,
                  worker: res.nakes[0]
                },
                isLoaded: true
              });
            }
          );
        });
    };

    fetchTransaction();
  }, []);

  return (
    <Container>
      <Header
        iconName="chevron-back-outline"
        title="Riwayat"
        onPress={() => Actions.pop()}
      />
      <Content>
        {!state.isLoaded ? (
          <ActivityIndicator />
        ) : (
          <CardTransaction
            name={state.activeTransaction.worker.nama}
            photoSource={{
              uri: StringBuilder.addBaseURL(state.activeTransaction.worker.foto)
            }}
            status={state.activeTransaction.status}
            date={state.activeTransaction.waktuDibuat}
            onPress={() => Actions.chat()}
          />
        )}
        {/* {mockData.map((element, index) => (
          <CardTransaction
            key={index}
            name={element.name}
            photoSource={{ uri: element.photoSource }}
            status={element.status}
            date={element.date}
            onPress={() => Actions.chat()}
          />
        ))} */}
      </Content>
    </Container>
  );
};

History.propTypes = propTypes;
History.defaultProps = defaultProps;

export default History;
