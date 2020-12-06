import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Thumbnail, CardItem, Text } from 'native-base';
import styles from './styles';
import { StringBuilder } from '../../../../helpers';

const propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string,
  status: PropTypes.bool,
  photoSource: PropTypes.objectOf(PropTypes.string),
  cost: PropTypes.number,
  costDetail: PropTypes.objectOf(PropTypes.any),
  worker: PropTypes.bool
};

const defaultProps = {
  date: '',
  status: false,
  cost: 0,
  photoSource: {},
  costDetail: {},
  worker: false
};

const CardTransaction = (props) => {
  const { name, photoSource, status, date, worker, cost, costDetail } = props;

  return (
    <View style={styles.card}>
      <View noShadow>
        <CardItem style={!worker ? styles.bundleWorker : styles.bundle}>
          {!worker && <Thumbnail source={photoSource} style={styles.img} />}
          <View style={styles.subcard}>
            <Text style={styles.textSubcard}>{name}</Text>
            <Text style={styles.doneSubcard}>{date}</Text>
            {worker && (
              <View>
                <Text style={styles.detailTranscaction}>
                  {`Pendapatan bersih : ${StringBuilder.formatCurrency(
                    costDetail.biayaJasa
                  )}`}
                </Text>
                <Text style={styles.detailTranscaction}>
                  {`Biaya yang harus disetor (5%) : ${StringBuilder.formatCurrency(
                    costDetail.biayaAdmin
                  )}`}
                </Text>
                <Text style={styles.detailTranscaction}>
                  {`Biaya Transportasi : ${StringBuilder.formatCurrency(
                    costDetail.biayaTranspor
                  )}`}
                </Text>
              </View>
            )}
            <Text style={styles.doneSubcardCost}>
              {`Rp. ${StringBuilder.formatCurrency(cost)} • `}
              <Text style={status ? styles.done : styles.failed}>
                {status ? 'Selesai' : 'Gagal'}
              </Text>
            </Text>
          </View>
        </CardItem>
      </View>
    </View>
  );
};

CardTransaction.propTypes = propTypes;
CardTransaction.defaultProps = defaultProps;

export default CardTransaction;
